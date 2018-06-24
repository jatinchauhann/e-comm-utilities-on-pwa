
// Pop up a user notification
export default function showToast(message) {
  var notification = document.getElementById('snackbar');
  if (notification && ('MaterialSnackbar' in notification)) {
    notification.MaterialSnackbar.showSnackbar({message: (message)});
  }
}
