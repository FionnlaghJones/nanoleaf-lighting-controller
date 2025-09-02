$(document).ready(function () {
  $("#identify").click(identifyController);
  $("#auth").click(getAuthToken);
});

identifyController = function () {
  alert("identify button clicked");
};

getAuthToken = function () {
  const endpoint = "/api/v1/new";
  let controllerAddress = $("#controllers").find(":selected").val();
  $.post(`${controllerAddress}${endpoint}`, {}).done(function (data) {
    console.log("Data Loaded: ", data);
  });
};
