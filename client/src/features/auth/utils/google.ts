export const googleInit = (
  text: string,
  element: HTMLElement | null,
  callback: Function
) => {
  //@ts-ignore
  if (window.google) {
    //@ts-ignore
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: callback,
    });

    //@ts-ignore
    google.accounts.id.renderButton(element, {
      text: text,
      width: "270px",
    });
  }
};
