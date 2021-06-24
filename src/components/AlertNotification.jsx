const AlertNotification = ({ noti, children }) => {
  return (
    <>
      <div class="square_box box_three"></div>
      <div class="square_box box_four"></div>
      <div class="col-sm-12">
        <div class="alert fade alert-simple alert-success alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show">
          <button
            type="button"
            class="close font__size-18"
            data-dismiss="alert"
          >
            <span aria-hidden="true">
              <a
                href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwjVtMfrsbLwAhXryzgGHdXMB7I4ChAWMAh6BAgIEAM&url=https%3A%2F%2Fwww.ftcab.com%2F&usg=AOvVaw3v44T5yZdpdgVq0agYf0eg"
                target="_blank"
              >
                <i class="fa fa-times greencross"></i>
              </a>
            </span>
            <span class="sr-only">Close</span>
          </button>
          <i class="start-icon far fa-check-circle faa-tada animated"></i>
          <strong class="font__weight-semibold">Well done!</strong> {children}
        </div>
      </div>
    </>
  );
};
export default AlertNotification;
