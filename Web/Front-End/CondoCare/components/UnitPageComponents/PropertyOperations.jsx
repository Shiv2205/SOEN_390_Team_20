import { useMemo, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import {
  Box,
  Button,
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

const PropertyOperations = ({ propertyId, isAdmin }) => {
  const [validationErrors, setValidationErrors] = useState({});

  const columns = useMemo(
    () => [
      {
        accessorKey: 'operation_id',
        header: 'Operation ID',
        enableEditing: false,
      },
      {
        accessorKey: 'operation_name',
        header: 'Operation Name',
        enableEditing: isAdmin,
      },
      {
        accessorKey: 'operation_cost',
        header: 'Cost',
        enableEditing: isAdmin,
        type: 'number',
      },
    ],
    [isAdmin],
  );

  const {
    data: operations = [],
    isError: isLoadingOperationsError,
    isFetching: isFetchingOperations,
    isLoading: isLoadingOperations,
  } = useGetOperations(propertyId);

  const { mutateAsync: createOperation } = useCreateOperation();
  const { mutateAsync: updateOperation } = useUpdateOperation();
  const { mutateAsync: deleteOperation } = useDeleteOperation();

  const handleCreateOperation = async ({ values, table }) => {
    const newValidationErrors = validateOperation(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await createOperation(values);
    table.setCreatingRow(null);
  };

  const handleUpdateOperation = async ({ values, table }) => {
    const newValidationErrors = validateOperation(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await updateOperation(values);
    table.setEditingRow(null);
  };

  const openDeleteConfirmModal = (row) => {
    if (window.confirm('Are you sure you want to delete this operation?')) {
      deleteOperation(row.original.operation_id);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: operations,
    enableEditing: isAdmin,
    getRowId: (row) => row.operation_id,
    muiToolbarAlertBannerProps: isLoadingOperationsError
      ? {
          color: 'error',
          children: 'Error loading operations',
        }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: '500px',
      },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateOperation,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleUpdateOperation,
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
      isAdmin && (
        <Button
          variant="contained"
          onClick={() => table.setCreatingRow(true)}
        >
          Create New Operation
        </Button>
      )
    ),
    state: {
      isLoading: isLoadingOperations,
      showAlertBanner: isLoadingOperationsError,
      showProgressBars: isFetchingOperations,
    },
  });

  return <MaterialReactTable table={table} />;
};

function useGetOperations(propertyId) {
  const SERVER = import.meta.env.VITE_SERVER_BASE_URL;
  const url = `${SERVER}/properties/operations/get`;

  return useQuery({
    queryKey: ['operations', propertyId],
    queryFn: async () => {
      const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ property_id: propertyId }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch operations');
      }

      const data = await response.json();
      return data.data;
    },
    refetchOnWindowFocus: false,
  });
}

function useCreateOperation() {
  const queryClient = useQueryClient();
  const SERVER = import.meta.env.VITE_SERVER_BASE_URL;
  const url = `${SERVER}/operations/register`;

  return useMutation({
    mutationFn: async (operation) => {
      const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(operation),
      });

      if (!response.ok) {
        throw new Error('Failed to create operation');
      }

      const data = await response.json();
      return data.data;
    },
    onSettled: () => queryClient.invalidateQueries(['operations']),
  });
}

function useUpdateOperation() {
  const queryClient = useQueryClient();
  const SERVER = import.meta.env.VITE_SERVER_BASE_URL;
  const url = `${SERVER}/operations/update`;

  return useMutation({
    mutationFn: async (operation) => {
      const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(operation),
      });

      if (!response.ok) {
        throw new Error('Failed to update operation');
      }

      const data = await response.json();
      return data.data;
    },
    onSettled: () => queryClient.invalidateQueries(['operations']),
  });
}

function useDeleteOperation() {
  const queryClient = useQueryClient();
  const SERVER = import.meta.env.VITE_SERVER_BASE_URL;
  const url = `${SERVER}/operations/delete`;

  return useMutation({
    mutationFn: async (operationId) => {
      const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ operation_id: operationId }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete operation');
      }

      const data = await response.json();
      return data.data;
    },
    onSettled: () => queryClient.invalidateQueries(['operations']),
  });
}

function validateOperation(operation) {
  let errors = {};
  if (!operation.operation_name) {
    errors.operation_name = 'Operation name is required';
  }
  if (!operation.operation_cost) {
    errors.operation_cost = 'Operation cost is required';
  }
  return errors;
}

const queryClient = new QueryClient();

const PropertyOperationsWithProviders = ({ propertyId, isAdmin }) => (
  <QueryClientProvider client={queryClient}>
    <PropertyOperations propertyId={propertyId} isAdmin={isAdmin} />
  </QueryClientProvider>
);

export default PropertyOperationsWithProviders;