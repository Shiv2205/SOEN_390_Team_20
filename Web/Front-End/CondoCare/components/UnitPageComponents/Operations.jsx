import { useMemo, useState } from 'react';
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  // createRow,
  useMaterialReactTable,
} from 'material-react-table';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Example = ({ propertyId, isAdmin }) => {
  const [validationErrors, setValidationErrors] = useState({});

  const columns = useMemo(
    () => [
      {
        accessorKey: 'operation_id',
        header: 'Operation ID',
        size: 80,
      },
      {
        accessorKey: 'operation_name',
        header: 'Operation Name',
      },
      {
        accessorKey: 'operation_cost',
        header: 'Cost',
      },
    ],
    [validationErrors],
  );

  //call CREATE hook
  const { mutateAsync: createOperationCost, isPending: isCreatingOperationCost } =
    useCreateOperationCost();
  //call READ hook
  const {
    data: fetchedOperationCosts = [],
    isError: isLoadingOperationCostsError,
    isFetching: isFetchingOperationCosts,
    isLoading: isLoadingOperationCosts,
  } = useGetOperationCosts(propertyId);

  //call UPDATE hook
  const { mutateAsync: updateOperationCost, isPending: isUpdatingOperationCost } =
    useUpdateOperationCost();
  //call DELETE hook
  const { mutateAsync: deleteOperationCost, isPending: isDeletingOperationCost } =
    useDeleteOperationCost();

  //CREATE action
  const handleCreateOperationCost = async ({ values, table }) => {
    const newValidationErrors = validateOperationCost(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await createOperationCost(values);
    table.setCreatingRow(null); //exit creating mode
  };

  //UPDATE action
  const handleSaveOperationCost = async ({ values, table }) => {
    const newValidationErrors = validateOperationCost(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await updateOperationCost(values);
    table.setEditingRow(null); //exit editing mode
  };

  //DELETE action
  const openDeleteConfirmModal = (row) => {
    if (window.confirm('Are you sure you want to delete this operation cost?')) {
      deleteOperationCost(row.original.operation_id);
    }
  };

  const table = useMaterialReactTable({
    columns,
    enableHiding: false,
    enableFullScreenToggle: false,
    data: fetchedOperationCosts,
    createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
    editDisplayMode: isAdmin ? 'row' : 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    getRowId: (row) => row.operation_id,
    muiToolbarAlertBannerProps: isLoadingOperationCostsError
      ? {
          color: 'error',
          children: 'Error loading data',
        }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: '500px',
      },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateOperationCost,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveOperationCost,
    //optionally customize modal content
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Create New Operation Cost</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    //optionally customize modal content
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Edit Operation Cost</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        {isAdmin && (
          <>
            <Tooltip title="Edit">
              <IconButton onClick={() => table.setEditingRow(row)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </>
        )}
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <>
        {isAdmin && (
          <Button
            variant="contained"
            onClick={() => {
              table.setCreatingRow(true);
            }}
          >
            Create New Operation Costs
          </Button>
        )}
      </>
    ),
    state: {
      isLoading: isLoadingOperationCosts,
      isSaving: isCreatingOperationCost || isUpdatingOperationCost || isDeletingOperationCost,
      showAlertBanner: isLoadingOperationCostsError,
      showProgressBars: isFetchingOperationCosts,
      columnVisibility: { operation_id : isAdmin}
    },
  });

  return <MaterialReactTable table={table} />;
};

//CREATE hook (post new operation cost to api)
function useCreateOperationCost() {
  const queryClient = useQueryClient();
  const SERVER = import.meta.env.VITE_SERVER_BASE_URL;
  const url = `${SERVER}/operation-cost/new`;
  return useMutation({
    mutationFn: async (operationCost) => {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {'Content-Type': 'application/json',},
          body: JSON.stringify(operationCost),
        });

        if (!response.ok) {
          throw new Error('Failed to create operation cost data');
        }

        const data = await response.json();
        return data.data;
      } catch (error) {
        // Handle errors gracefully
        throw new Error('Error creating operation cost: ' + error.message);
      }
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['operationCosts'] }), //refetch operation costs after mutation
  });
}

//READ hook (get operation costs from api)
function useGetOperationCosts(propertyId) {
  const SERVER = import.meta.env.VITE_SERVER_BASE_URL;
  const url = `${SERVER}/operation-costs/${propertyId}`;

  return useQuery({
    queryKey: ['operationCosts', propertyId],
    queryFn: async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch operation costs');
        }
        const data = await response.json();
        return data.data;
      } catch (error) {
        // Handle errors gracefully
        throw new Error('Error fetching operation costs: ' + error.message);
      }
    },
    refetchOnWindowFocus: false,
  });
}

//UPDATE hook (put operation cost in api)
function useUpdateOperationCost() {
  const queryClient = useQueryClient();
  const SERVER = import.meta.env.VITE_SERVER_BASE_URL;
  const url = `${SERVER}/operation-cost/update`;
  return useMutation({
    mutationFn: async (operationCost) => {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {'Content-Type': 'application/json',},
          body: JSON.stringify(operationCost),
        });

        if (!response.ok) {
          throw new Error('Failed to update operation cost data');
        }

        const data = await response.json();
        return data.data;
      } catch (error) {
        // Handle errors gracefully
        throw new Error('Error updating operation cost: ' + error.message);
      }
    },
    //client side optimistic update
    onMutate: (newOperationCostInfo) => {
      queryClient.setQueryData(['operationCosts'], (prevOperationCosts) =>
        prevOperationCosts?.map((prevOperationCost) =>
          prevOperationCost.operation_id === newOperationCostInfo.operation_id ? newOperationCostInfo : prevOperationCost,
        ),
      );
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['operationCosts'] }), //refetch operation costs after mutation
  });
}

//DELETE hook (delete operation cost in api)
function useDeleteOperationCost() {
  const queryClient = useQueryClient();
  const SERVER = import.meta.env.VITE_SERVER_BASE_URL;
  const url = `${SERVER}/operation-cost/delete`;
  return useMutation({
    mutationFn: async (operation_id) => {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {'Content-Type': 'application/json',},
          body: JSON.stringify({operation_id : operation_id}),
        });

        if (!response.ok) {
          throw new Error('Failed to delete operation cost');
        }

        const data = await response.json();
        return data.data;
      } catch (error) {
        // Handle errors gracefully
        throw new Error('Error deleting operation cost: ' + error.message);
      }
    },
    //client side optimistic update
    onMutate: (operation_id) => {
      queryClient.setQueryData(['operationCosts'], (prevOperationCosts) =>
        prevOperationCosts?.filter((operationCost) => operationCost.operation_id !== operation_id),
      );
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['operationCosts'] }), //refetch operation costs after mutation
  });
}

const queryClient = new QueryClient();

const Operations = ({ propertyId, isAdmin }) => (
  //Put this with your other react-query providers near root of your app
  <QueryClientProvider client={queryClient}>
    <Example propertyId={propertyId} isAdmin={isAdmin}/>
  </QueryClientProvider>
);

export default Operations;

const validateRequired = (value) => !!value.length;

function validateOperationCost(operationCost) {
  return {
    description: !validateRequired(operationCost.description) ? 'description is Required' : '',
    lastName: !validateRequired(operationCost.type) ? 'type is Required' : '',
  };
}
