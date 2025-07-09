import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

export default function Alerts({severity,type,message,sx}) {
  return (
    <Stack sx={sx} spacing={2}>
      <Alert severity={severity}>
        <AlertTitle>{type}</AlertTitle>
        {message}
      </Alert>
    </Stack>
  );
}