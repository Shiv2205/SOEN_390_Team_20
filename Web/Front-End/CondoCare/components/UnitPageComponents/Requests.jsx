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
import { fakeData, RequestStatuses, RequestTypes } from './makeData';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Example = ({id,isAdmin}) => {
  const [validationErrors, setValidationErrors] = useState({});

  const columns = useMemo(
    () => [
      {
        accessorKey: 'request_id',
        header: 'Request Id',
        enableEditing: false,
        size: 80,
        Edit: () => null,
      },
      
      {
        accessorKey: 'unit_id',
        header: 'Unit ID',
        enableEditing: false,
        Edit: () => null,
      },
      {
        accessorKey: 'description',
        header: 'Description',
        enableEditing: !isAdmin
      },
      {
        accessorKey: 'type',
        header: 'Type',
        editVariant: 'select',
        editSelectOptions: RequestTypes,
        enableEditing: !isAdmin,
        muiEditTextFieldProps: {
          type: 'type',
          select: true,
          required: true,
          error: !!validationErrors?.type,
          helperText: validationErrors?.type,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              type: undefined,
            }),
        },
      },
      {
        accessorKey: 'status',
        header: 'Status',
        editVariant: 'select',
        enableEditing: isAdmin,
        editSelectOptions: RequestStatuses,
        Edit: !isAdmin ? () => null : () => true, // this line is what causes the employee table to hide the status on edit
        muiEditTextFieldProps: {
          type: 'status',
          select: true,
          required: true,
          error: !!validationErrors?.status,
          helperText: validationErrors?.status,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              type: undefined,
            }),
        },
      },
    ],
    [validationErrors],
  );

  //call CREATE hook
  const { mutateAsync: createUser, isPending: isCreatingUser } =
    useCreateUser();
  //call READ hook
  const {
    data: fetchedUsers = [],
    isError: isLoadingUsersError,
    isFetching: isFetchingUsers,
    isLoading: isLoadingUsers,
  } = useGetRequests(id, isAdmin);

  //call UPDATE hook
  const { mutateAsync: updateUser, isPending: isUpdatingUser } =
    useUpdateUser();
  //call DELETE hook
  const { mutateAsync: deleteUser, isPending: isDeletingUser } =
    useDeleteUser();

  //CREATE action
  const handleCreateUser = async ({ values, table }) => {
    values.unit_id = id;
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await createUser(values);
    table.setCreatingRow(null); //exit creating mode
  };

  //UPDATE action
  const handleSaveUser = async ({ values, table }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await updateUser(values);
    table.setEditingRow(null); //exit editing mode
  };

  //DELETE action
  const openDeleteConfirmModal = (row) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(row.original.request_id);
    }
  };

  const table = useMaterialReactTable({
    columns,
    enableHiding: false,
    enableFullScreenToggle: false,
    data: fetchedUsers,
    createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
    editDisplayMode: isAdmin ? 'row' : 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingUsersError
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
    onCreatingRowSave: handleCreateUser,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveUser,
    //optionally customize modal content
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Create New Requesst</DialogTitle>
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
        <DialogTitle variant="h3">Edit Request</DialogTitle>
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
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        {isAdmin ? (<></>) : (
          <Tooltip title="Delete">
              <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
                <DeleteIcon />
              </IconButton>
          </Tooltip>
        )}
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <>
      {isAdmin ? (<></>) : (
        <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true); //simplest way to open the create row modal with no default values
          //or you can pass in a row object to set default values with the `createRow` helper function
          // table.setCreatingRow(
            //   createRow(table, {
              //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
              //   }),
              // );
            }}
            >
        Create New Request
      </Button>
      )}
      </>
    ),
    state: {
      isLoading: isLoadingUsers,
      isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
      showAlertBanner: isLoadingUsersError,
      showProgressBars: isFetchingUsers,
      columnVisibility: { unit_id : isAdmin}
    },
  });

  return <MaterialReactTable table={table} />;
};

//CREATE hook (post new user to api)
function useCreateUser() {
  const queryClient = useQueryClient();
  const SERVER = import.meta.env.VITE_SERVER_BASE_URL;
  const url = `${SERVER}/request/new`;
  return useMutation({
    mutationFn: async (user) => {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {'Content-Type': 'application/json',},
          body: JSON.stringify(user),
        });

        if (!response.ok) {
          throw new Error('Failed to create request data');
        }

        const data = await response.json();
        return data.data;
      } catch (error) {
        // Handle errors gracefully
        throw new Error('Error creating request: ' + error.message);
      }
    },
    //client side optimistic update
    // onMutate: (newUserInfo) => {
    //   queryClient.setQueryData(['users'], (prevUsers) => [
    //     ...prevUsers,
    //     {
    //       ...newUserInfo,
    //       id: (Math.random() + 1).toString(36).substring(7),
    //     },
    //   ]);
    // },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}

//READ hook (get users from api)
function useGetRequests(id, isAdmin) {
  const SERVER = import.meta.env.VITE_SERVER_BASE_URL;
  const url = isAdmin ? `${SERVER}/request/employee` : `${SERVER}/request/unit`;

  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {'Content-Type': 'application/json',},
          body: JSON.stringify({unit_id : id}),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch request data');
        }

        const data = await response.json();
        return data.data;
      } catch (error) {
        // Handle errors gracefully
        throw new Error('Error fetching request data: ' + error.message);
      }
    },
    refetchOnWindowFocus: false,
  });
}


//UPDATE hook (put user in api)
function useUpdateUser() {
  const queryClient = useQueryClient();
  const SERVER = import.meta.env.VITE_SERVER_BASE_URL;
  const url = `${SERVER}/request/update`;
  return useMutation({
    mutationFn: async (request) => {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {'Content-Type': 'application/json',},
          body: JSON.stringify(request),
        });

        if (!response.ok) {
          throw new Error('Failed to update request data');
        }

        const data = await response.json();
        return data.data;
      } catch (error) {
        // Handle errors gracefully
        throw new Error('Error updating request: ' + error.message);
      }
    },
    //client side optimistic update
    onMutate: (newRequestInfo) => {
      queryClient.setQueryData(['users'], (prevRequests) =>
        prevRequests?.map((prevRequest) =>
          prevRequest.request_id === newRequestInfo.request_id ? newRequestInfo : prevRequest,
        ),
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}

//DELETE hook (delete user in api)
function useDeleteUser() {
  const queryClient = useQueryClient();
  const SERVER = import.meta.env.VITE_SERVER_BASE_URL;
  const url = `${SERVER}/request/delete`;
  return useMutation({
    mutationFn: async (request_id) => {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {'Content-Type': 'application/json',},
          body: JSON.stringify({request_id : request_id}),
        });

        if (!response.ok) {
          throw new Error('Failed to delete request');
        }

        const data = await response.json();
        return data.data;
      } catch (error) {
        // Handle errors gracefully
        throw new Error('Error deleting request: ' + error.message);
      }
    },
    //client side optimistic update
    onMutate: (request_id) => {
      queryClient.setQueryData(['users'], (prevUsers) =>
        prevUsers?.filter((user) => user.request_id !== request_id),
      );
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}

const queryClient = new QueryClient();

const ExampleWithProviders = ({id, isAdmin}) => (
  //Put this with your other react-query providers near root of your app
  <QueryClientProvider client={queryClient}>
    <Example id={id} isAdmin={isAdmin}/>
  </QueryClientProvider>
);

export default ExampleWithProviders;

const validateRequired = (value) => !!value.length;

function validateUser(user) {
  return {
    description: !validateRequired(user.description) ? 'description is Required' : '',
    lastName: !validateRequired(user.type) ? 'type is Required' : '',
  };
}
