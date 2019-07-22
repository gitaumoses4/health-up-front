import socketIOClient from 'socket.io-client';
import toast from 'toastr';
import store from '../redux/store';
import { requestResourceSuccess } from '../redux/resources/resourceActions';
import resources from '../redux/resources';


const baseUrl = process.env.REACT_APP_API_URL;

const serverUrl = baseUrl.replace('/api/v1', '');

export const io = socketIOClient(serverUrl, { transports: ['websocket', 'polling'] });


export default function handleNotification({ id }) {
  io.on(`notification-${id}`, (data) => {
    const { systemNotification: { text } } = data;
    toast.success(text);
    store.dispatch(requestResourceSuccess('notifications', 'create', true)(
      { notification: data }, resources.notifications,
    ));
  });
}
