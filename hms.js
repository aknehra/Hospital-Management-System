var app = angular.module("app", ["ui.router"]);
app.config([
  "$stateProvider",
  "$urlRouterProvider",
  function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("home", {
        url: "/home",
        templateUrl: "home.html",
        controller: "home_ctrl",
      })
      .state("patient_registration", {
        url: "/patient_register",
        templateUrl: "patient_registration.html",
        controller: "pt_reg_ctrl",
      })
      .state("patient_login", {
        url: "/patient_login",
        templateUrl: "patient_login.html",
        controller: "pt_login_ctrl",
      })
      .state("pt_dash", {
        url: "/pt_dash",
        templateUrl: "pt_dash.html",
        controller: "pt_dash_ctrl",
      })
      .state("pt_dash.profile", {
        url: "/profile",
        templateUrl: "pt_profile.html",
      })
      .state("pt_dash.medicalHistory", {
        url: "/medicalHistory",
        templateUrl: "pt_medicalHistory.html",
        controller: "medHistory_ctrl",
      })
      .state("pt_dash.book", {
        url: "/book Appointment",
        templateUrl: "book.html",
        controller: "bookApp_ctrl",
      })
      .state("pt_dash.appointments", {
        url: "/appointments",
        templateUrl: "pt_appointments.html",
        controller: "appointments_ctrl",
      })
      .state("pt_dash.previousapt", {
        url: "/previousapt",
        templateUrl: "pt_previousapt.html",
        controller: "pt_previousapt_ctrl",
      })
      .state("dr_reg", {
        url: "/dr_reg",
        templateUrl: "dr_reg.html",
        controller: "dr_reg_ctrl",
      })
      .state("dr_login", {
        url: "/dr_login",
        templateUrl: "dr_login.html",
        controller: "dr_login_ctrl",
      })
      .state("dr_dash", {
        url: "/dr_dash",
        templateUrl: "dr_dash.html",
        controller: "dr_dash_ctrl",
      })
      .state("dr_dash.profile", {
        url: "/profile",
        templateUrl: "dr_profile.html",
        controller: "dr_profile_ctrl",
      })
      .state("dr_dash.appRequest", {
        url: "/appRequests",
        templateUrl: "dr_appRequest.html",
        controller: "drapp_req_ctrl",
      })
      .state("dr_dash.fixedapp", {
        url: "/fixed appointments",
        templateUrl: "dr_fixedapp.html",
        controller: "dr_fixed_ctrl",
      })
      .state("dr_dash.ptList", {
        url: "/ptList",
        templateUrl: "dr_ptList.html",
        controller: "dr_ptlist_ctrl",
      })
      .state("recp_login", {
        url: "/recp_login",
        templateUrl: "recp_login.html",
        controller: "recp_login_ctrl",
      })
      .state("recp_dash", {
        url: "/recp_dash",
        templateUrl: "recp_dash.html",
        controller: "recp_dash_ctrl",
      })
      .state("recp_dash.drlist", {
        url: "/drList",
        templateUrl: "recp_drList.html",
        controller: "recp_drlist_ctrl",
      })
      .state("recp_dash.ptlist", {
        url: "/recp_ptList",
        templateUrl: "recp_ptList.html",
        controller: "recp_ptlist_ctrl",
      })
      .state("recp_dash.appRequest", {
        url: "/recp appRequest",
        templateUrl: "recp_appRequest.html",
        controller: "recp_appRequest_ctrl",
      });

    $urlRouterProvider.otherwise("/home");
  },
]);

app.controller("home_ctrl", function () {
  document.getElementById("mainbar").style.display = "block";
});

app.controller("pt_reg_ctrl", function ($scope, $http, $location, $filter) {
  document.getElementById("mainbar").style.display = "none";
  $scope.ptregister = function () {
    $scope.dob = $filter("date")($scope.dob, "yyyy-MM-dd");
    var registerobj = {
      name: $scope.fname,
      dob: $scope.dob,
      gender: $scope.gender,
      age: $scope.age,
      email: $scope.email,
      username: $scope.username,
      pass: $scope.password,
      cpass: $scope.cnfrmpassword,
      aadhar: $scope.adn,
      occupation: $scope.occupation,
      phone_number: $scope.mobile,
      address: $scope.address,
      city: $scope.city,
      state: $scope.state,
      pin: $scope.pin,
    };
    if (
      $scope.fname == undefined ||
      $scope.dob == undefined ||
      $scope.gender == undefined ||
      $scope.age == undefined ||
      $scope.email == undefined ||
      $scope.username == undefined ||
      $scope.password == undefined ||
      $scope.cnfrmpassword == undefined ||
      $scope.adn == undefined ||
      $scope.occupation == undefined ||
      $scope.mobile == undefined ||
      $scope.address == undefined ||
      $scope.city == undefined ||
      $scope.state == undefined ||
      $scope.pin == undefined ||
      $scope.fname == "" ||
      $scope.dob == "" ||
      $scope.gender == "" ||
      $scope.age == "" ||
      $scope.email == "" ||
      $scope.username == "" ||
      $scope.password == "" ||
      $scope.cnfrmpassword == "" ||
      $scope.adn == "" ||
      $scope.occupation == "" ||
      $scope.mobile == "" ||
      $scope.address == "" ||
      $scope.city == "" ||
      $scope.state == "" ||
      $scope.pin == ""
    ) {
      Swal.fire({
        title: "Input Fields are Empty!",
        allowOutsideClick: () => {
          const popup = Swal.getPopup();
          popup.classList.remove("swal2-show");
          setTimeout(() => {
            popup.classList.add("animate__animated", "animate__headShake");
          });
          setTimeout(() => {
            popup.classList.remove("animate__animated", "animate__headShake");
          }, 500);
          return;
        },
      });
      return;
    }
    if ($scope.password != $scope.cnfrmpassword) {
      Swal.fire(
        "Oops",
        "Password And Confirm Password does not match!",
        "info"
      );
      return;
    } else {
      $http({
        method: "POST",
        url: "http://10.21.66.37:8000/patients/register/", // Backend
        data: registerobj,
      }).then(function (res) {
        if (res.data.success == true) {
          $scope.fname = "";
          $scope.dob = "";
          $scope.gender = "";
          $scope.age = "";
          $scope.email = "";
          $scope.username = "";
          $scope.password = "";
          $scope.cnfrmpassword = "";
          $scope.adn = "";
          $scope.occupation = "";
          $scope.mobile = "";
          $scope.address = "";
          $scope.city = "";
          $scope.state = "";
          $scope.pin = "";
          Swal.fire({
            icon: "success",
            // position: "top-end",
            title: "Registered Successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          $location.path("/patient_login");
        }
        if (res.data.success == false) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res.data.message,
          });
        }
      });
    }
  };
});

app.controller("pt_login_ctrl", function ($scope, $http, $location) {
  document.getElementById("mainbar").style.display = "none";
  $scope.login = function () {
    var ptloginobj = {
      username: $scope.username,
      pass: $scope.password,
    };
    if (
      $scope.username == undefined ||
      $scope.username == "" ||
      $scope.password == "" ||
      $scope.password == undefined
    ) {
      Swal.fire({
        title: "Input Fields are Empty!",
        allowOutsideClick: () => {
          const popup = Swal.getPopup();
          popup.classList.remove("swal2-show");
          setTimeout(() => {
            popup.classList.add("animate__animated", "animate__headShake");
          });
          setTimeout(() => {
            popup.classList.remove("animate__animated", "animate__headShake");
          }, 500);
          return;
        },
      });
      return;
    } else
      $http({
        method: "POST",
        url: "http://10.21.66.37:8000/patients/login/",
        data: ptloginobj,
      }).then(function (res) {
        if (res.data.success == true) {
          Swal.fire({
            icon: "success",
            position: "top-end",
            title: "Patient Login Successful",
            showConfirmButton: false,
            timer: 1500,
          });
          $scope.username = res.data.user;
          $scope.authkey = res.data.authorization_key;
          localStorage.setItem("username", JSON.stringify($scope.username));
          localStorage.setItem("authkey", JSON.stringify($scope.authkey));
          $location.path("/pt_dash");
        }
        if (res.data.success == false) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res.data.message,
          });
        }
      });
  };
});

app.controller("pt_dash_ctrl", function ($scope, $location, $http, $filter) {
  var user = JSON.parse(localStorage.getItem("username"));
  var auth = JSON.parse(localStorage.getItem("authkey"));
  if (user && auth) {
    document.getElementById("mainbar").style.display = "none";
    let user = JSON.parse(localStorage.getItem("username"));
    let auth = JSON.parse(localStorage.getItem("authkey"));
    userobj = {
      username: user,
      auth_key: auth,
    };
    $http({
      method: "POST",
      url: "http://10.21.66.37:8000/patients/dashboard/",
      data: userobj,
    }).then(function (res) {
      if (res.data.success == true) {
        $scope.ptfixnotify = function () {
          ptuserid = {
            username: user,
            auth_key: auth,
          };
          $http({
            method: "POST",
            url: "http://10.21.66.37:8000/patients/ptfixedappointments/",
            data: ptuserid,
          }).then(function (response) {
            $scope.ptfixnum = response.data;
            console.log($scope.ptfixnum);
          });
        };
        $scope.ptfixnotify();
        $scope.name = res.data.Name;
        $scope.username = user;
        $scope.age = res.data.Age;
        $scope.dob = res.data.Dob;
        $scope.dob = $filter("date")($scope.dob, "dd-MM-yyyy");
        $scope.email = res.data.Email;
        $scope.mobile = res.data.Phone;
        $scope.gender = res.data.Gender;
      }
      if (res.data.status == 401) {
        $location.path("/patient_login");
        Swal.fire({
          icon: "error",
          title: "You haven't logged in ?",
          text: res.data.message,
        });
      }
    });
    $scope.logout = function () {
      let auth = JSON.parse(localStorage.getItem("authkey"));
      ptlogout = {
        auth_key: auth,
      };
      $http({
        method: "POST",
        url: "http://10.21.66.37:8000/patients/logout/",
        data: ptlogout,
      });
      Swal.fire({
        icon: "success",
        // position: "top-end",
        title: "Logged Out Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      localStorage.removeItem("username");
      localStorage.removeItem("authkey");
      $location.path("/home");
    };
  } else {
    $location.path("/patient_login");
    Swal.fire("You haven't logged in ?", "Login First", "error");
  }
});

app.controller("dr_reg_ctrl", function ($scope, $http, $location, $filter) {
  document.getElementById("mainbar").style.display = "none";
  $scope.loadspecialization = function () {
    $http
      .get("http://10.21.66.37:8000/doctors/displayspeciality/")
      .then(function (specializations) {
        $scope.specializations = specializations.data;
      });
  };

  $scope.dregister = function () {
    $scope.dob = $filter("date")($scope.dob, "yyyy-MM-dd");
    var dregisterobj = {
      fname: $scope.fname,
      lname: $scope.lname,
      dob: $scope.dob,
      gender: $scope.gender,
      age: $scope.age,
      qualifications: $scope.qual,
      workexperience: $scope.work,
      speciality: $scope.specialization.id,
      email: $scope.email,
      address: $scope.address,
      aadhar: $scope.adn,
      username: $scope.username,
      pass: $scope.password,
      cpass: $scope.cnfrmpass,
      city: $scope.city,
      state: $scope.state,
      pin: $scope.pin,
      phone_number: $scope.mobile,
    };
    if (
      $scope.fname == undefined ||
      $scope.lname == undefined ||
      $scope.dob == undefined ||
      $scope.gender == undefined ||
      $scope.age == undefined ||
      $scope.qual == undefined ||
      $scope.work == undefined ||
      $scope.specialization.id == undefined ||
      $scope.adn == undefined ||
      $scope.email == undefined ||
      $scope.password == undefined ||
      $scope.username == undefined ||
      $scope.cnfrmpass == undefined ||
      $scope.mobile == undefined ||
      $scope.address == undefined ||
      $scope.city == undefined ||
      $scope.state == undefined ||
      $scope.pin == undefined ||
      $scope.fname == "" ||
      $scope.lname == "" ||
      $scope.dob == "" ||
      $scope.gender == "" ||
      $scope.age == "" ||
      $scope.qual == "" ||
      $scope.work == "" ||
      $scope.specialization.id == "" ||
      $scope.adn == "" ||
      $scope.email == "" ||
      $scope.password == "" ||
      $scope.username == "" ||
      $scope.cnfrmpass == "" ||
      $scope.mobile == "" ||
      $scope.address == "" ||
      $scope.city == "" ||
      $scope.state == "" ||
      $scope.pin == ""
    ) {
      Swal.fire({
        title: "Input Fields are Empty!",
        allowOutsideClick: () => {
          const popup = Swal.getPopup();
          popup.classList.remove("swal2-show");
          setTimeout(() => {
            popup.classList.add("animate__animated", "animate__headShake");
          });
          setTimeout(() => {
            popup.classList.remove("animate__animated", "animate__headShake");
          }, 500);
          return;
        },
      });
      return;
    }
    if ($scope.password != $scope.cnfrmpass) {
      Swal.fire(
        "Oops",
        "Password And Confirm Password does not match!",
        "info"
      );
      return;
    } else {
      $http({
        method: "POST",
        url: "http://10.21.66.37:8000/doctors/register/", // Backend
        data: dregisterobj,
      }).then(function (res) {
        if (res.data.success == false) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res.data.message,
          });
        }
        if (res.data.success == true) {
          $scope.fname = "";
          $scope.lname = "";
          $scope.dob = "";
          $scope.gender = "";
          $scope.age = "";
          $scope.qual = "";
          $scope.work = "";
          $scope.specialization.id = "";
          $scope.adn = "";
          $scope.email = "";
          $scope.password = "";
          $scope.username = "";
          $scope.cnfrmpass = "";
          $scope.mobile = "";
          $scope.address = "";
          $scope.city = "";
          $scope.state = "";
          $scope.pin = "";
          Swal.fire({
            icon: "success",
            // position: "top-end",
            title: "Registered Successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          $location.path("/dr_login");
        }
      });
    }
  };
});

app.controller("dr_login_ctrl", function ($scope, $http, $location) {
  document.getElementById("mainbar").style.display = "none";
  $scope.login = function () {
    $scope.username;
    $scope.password;

    var drloginobj = {
      username: $scope.username,
      pass: $scope.password,
    };

    if (
      $scope.username == undefined ||
      $scope.username == "" ||
      $scope.password == undefined ||
      $scope.password == ""
    ) {
      Swal.fire({
        title: "Input Fields are Empty!",
        allowOutsideClick: () => {
          const popup = Swal.getPopup();
          popup.classList.remove("swal2-show");
          setTimeout(() => {
            popup.classList.add("animate__animated", "animate__headShake");
          });
          setTimeout(() => {
            popup.classList.remove("animate__animated", "animate__headShake");
          }, 500);
          return;
        },
      });
      return;
    } else
      $http({
        method: "POST",
        url: "http://10.21.66.37:8000/doctors/login/",
        data: drloginobj,
      }).then(function (res) {
        if (res.data.success == true) {
          Swal.fire({
            icon: "success",
            position: "top-end",
            title: "Doctor Login Successful",
            showConfirmButton: false,
            timer: 1500,
          });
          $scope.username = res.data.user;
          $scope.authkey = res.data.authorization_key;
          localStorage.setItem("username", JSON.stringify($scope.username));
          localStorage.setItem("authkey", JSON.stringify($scope.authkey));
          $location.path("/dr_dash");
        }
        if (res.data.success == false) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res.data.message,
          });
        }
      });
  };
});

app.controller("dr_dash_ctrl", function ($http, $scope, $location) {
  var user = JSON.parse(localStorage.getItem("username"));
  var auth = JSON.parse(localStorage.getItem("authkey"));
  if (user && auth) {
    document.getElementById("mainbar").style.display = "none";
    var user = JSON.parse(localStorage.getItem("username"));
    var auth = JSON.parse(localStorage.getItem("authkey"));
    drobj = {
      username: user,
      auth_key: auth,
    };
    $http({
      method: "POST",
      url: "http://10.21.66.37:8000/doctors/dashboard/",
      data: drobj,
    }).then(function (res) {
      if (res.status == 200) {
        $scope.username = user;
        $scope.drprofiledata = res.data;
        druserobj = {
          username: user,
        };
        $scope.drreqnotify = function () {
          $http({
            method: "POST",
            url: "http://10.21.66.37:8000/doctors/drpendingappointments/",
            data: druserobj,
          }).then(function (response) {
            $scope.drreqnum = response.data;
            // console.log($scope.drreqnum);
          });
        };
        $scope.drreqnotify();
        $scope.drfixednotify = function () {
          var user = JSON.parse(localStorage.getItem("username"));
          var auth = JSON.parse(localStorage.getItem("authkey"));
          fixedaptobj = {
            username: user,
            auth_key: auth,
          };
          $http({
            method: "POST",
            url: "http://10.21.66.37:8000/doctors/showdrfixappointments/",
            data: fixedaptobj,
          }).then(function (response) {
            $scope.fixedaptnum = response.data;
          });
        };
        $scope.drfixednotify();
      }
      if (res.data.status == 401) {
        $location.path("/dr_login");
        Swal.fire({
          icon: "error",
          title: "You haven't logged in ?",
          text: res.data.message,
        });
      }
    });
    $scope.logout = function () {
      let auth = JSON.parse(localStorage.getItem("authkey"));
      drlogout = {
        auth_key: auth,
      };
      $http({
        method: "POST",
        url: "http://10.21.66.37:8000/doctors/logout/",
        data: drlogout,
      });
      Swal.fire({
        icon: "success",
        // position: "top-end",
        title: "Logged Out Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      localStorage.removeItem("username");
      localStorage.removeItem("authkey");
      $location.path("/home");
    };
  } else {
    $location.path("/dr_login");
    Swal.fire("You haven't logged in ?", "Login First", "error");
  }
});

app.controller("pt_previousapt_ctrl", function ($scope, $http) {
  $scope.visited = function () {
    let user = JSON.parse(localStorage.getItem("username"));
    let auth = JSON.parse(localStorage.getItem("authkey"));
    ptusername = {
      username: user,
      auth_key: auth,
    };
    $http({
      method: "POST",
      url: "http://10.21.66.37:8000/patients/ptpreviousappointments/",
      data: ptusername,
    }).then(function (response) {
      $scope.previousapts = response.data;
      console.log(response.data);
      console.log($scope.previousapts);
    });
  };
  $scope.rejected = function () {
    let user = JSON.parse(localStorage.getItem("username"));
    let auth = JSON.parse(localStorage.getItem("authkey"));
    ptusername = {
      username: user,
      auth_key: auth,
    };
    $http({
      method: "POST",
      url: "http://10.21.66.37:8000/patients/ptrejectedappointments/",
      data: ptusername,
    }).then(function (response) {
      $scope.rejectapts = response.data;
      console.log(response.data);
      console.log($scope.rejectapts);
    });
  };
  $scope.rejected();
  $scope.visited();
  $scope.rejectindex = function (index) {
    let user = JSON.parse(localStorage.getItem("username"));
    let auth = JSON.parse(localStorage.getItem("authkey"));
    resindex = {
      username: user,
      auth_key: auth,
      id: index,
    };
    $http({
      method: "POST",
      url: "http://10.21.66.37:8000/patients/rejectreason/",
      data: resindex,
    }).then(function (response) {
      $scope.resmsg = response.data;
    });
  };
  $scope.viewprescription = function (index) {
    let user = JSON.parse(localStorage.getItem("username"));
    let auth = JSON.parse(localStorage.getItem("authkey"));
    viewpresobj = {
      id: index,
      auth_key: auth,
      username: user,
    };
    $http({
      method: "POST",
      url: "http://10.21.66.37:8000/patients/viewptprescription/",
      data: viewpresobj,
    }).then(function (response) {
      $scope.viewpresdata = response.data;
      console.log($scope.viewpresdata);
    });
  };
});

app.controller("dr_profile_ctrl", function ($http, $scope, $filter) {
  let user = JSON.parse(localStorage.getItem("username"));
  let auth = JSON.parse(localStorage.getItem("authkey"));
  userobj = {
    username: user,
    auth_key: auth,
  };
  $http({
    method: "POST",
    url: "http://10.21.66.37:8000/doctors/dashboard/",
    data: userobj,
  }).then(function (res) {
    $scope.name = res.data.Name;
    $scope.username = user;
    $scope.age = res.data.Age;
    $scope.dob = res.data.Dob;
    $scope.dob = $filter("date")($scope.dob, "dd-MM-yyyy");
    $scope.email = res.data.Email;
    $scope.gender = res.data.Gender;
    $scope.speciality = res.data.Speciality;
  });
});

app.controller("medHistory_ctrl", function ($scope, $http) {
  let user = JSON.parse(localStorage.getItem("username"));
  let auth = JSON.parse(localStorage.getItem("authkey"));
  document.getElementById("mainbar").style.display = "none";
  $scope.medform = function () {
    medobj = {
      height: $scope.ptHeight,
      weight: $scope.ptWeight,
      drug_all: $scope.allergy,
      illness: $scope.illness,
      operations: $scope.operation,
      medications: $scope.medication,
      habits: $scope.health,
      extra_info: $scope.comments,
      username: user,
      auth_key: auth,
    };
    console.log(medobj);
    if (
      $scope.ptHeight == undefined ||
      $scope.ptHeight == "" ||
      $scope.ptWeight == undefined ||
      $scope.ptWeight == "" ||
      $scope.allergy == undefined ||
      $scope.allergy == "" ||
      $scope.illness == undefined ||
      $scope.illness == "" ||
      $scope.operation == undefined ||
      $scope.operation == "" ||
      $scope.medication == undefined ||
      $scope.medication == "" ||
      $scope.health == undefined ||
      $scope.health == "" ||
      $scope.comments == undefined ||
      $scope.comments == ""
    ) {
      Swal.fire({
        title: "Input Fields are Empty!",
        allowOutsideClick: () => {
          const popup = Swal.getPopup();
          popup.classList.remove("swal2-show");
          setTimeout(() => {
            popup.classList.add("animate__animated", "animate__headShake");
          });
          setTimeout(() => {
            popup.classList.remove("animate__animated", "animate__headShake");
          }, 500);
          return;
        },
      });
      return;
    } else {
      $http({
        method: "POST",
        url: "http://10.21.66.37:8000/patients/addmedicalhistory/",
        data: medobj,
      }).then(function (response) {
        if (response.data.success == true) {
          $scope.ptHeight = "";
          $scope.ptWeight = "";
          $scope.allergy = "";
          $scope.illness = "";
          $scope.operation = "";
          $scope.medication = "";
          $scope.health = "";
          $scope.comments = "";
          Swal.fire({
            icon: "success",
            // position: "top-end",
            title: "Medical Form Filled Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    }
  };
});

app.controller("appointments_ctrl", function ($scope, $http) {
  let user = JSON.parse(localStorage.getItem("username"));
  let auth = JSON.parse(localStorage.getItem("authkey"));
  ptuserid = {
    username: user,
    auth_key: auth,
  };
  $scope.ptfixed = function () {
    $http({
      method: "POST",
      url: "http://10.21.66.37:8000/patients/ptfixedappointments/",
      data: ptuserid,
    }).then(function (response) {
      $scope.aptdetails = response.data;
      if ($scope.aptdetails.length == 0) {
        $scope.dataavail = true;
      }
    });
  };
  $scope.pending = function () {
    let user = JSON.parse(localStorage.getItem("username"));
    let auth = JSON.parse(localStorage.getItem("authkey"));
    userid = {
      username: user,
      auth_key: auth,
    };
    console.log(userid);
    $http({
      method: "POST",
      url: "http://10.21.66.37:8000/patients/viewpendingappointments/",
      data: userid,
    }).then(function (response) {
      $scope.aptpendings = response.data;
      console.log($scope.aptpendings);
    });
  };
  $scope.pending();
  $scope.ptfixed();
});

app.controller("bookApp_ctrl", function ($http, $filter, $scope) {
  document.getElementById("mainbar").style.display = "none";
  $scope.loadSpecialists = function () {
    $http
      .get("http://10.21.66.37:8000/doctors/displayspecializations/")
      .then(function (specialists) {
        $scope.specialists = specialists.data;
        console.log(specialists.data);
      });
  };
  $scope.loadDoctor = function () {
    let user = JSON.parse(localStorage.getItem("username"));
    let auth = JSON.parse(localStorage.getItem("authkey"));
    specialist = $scope.specialist;
    console.log(specialist);
    specidObj = {
      id: specialist,
      username: user,
      auth_key: auth,
    };
    $http({
      method: "POST",
      url: "http://10.21.66.37:8000/doctors/displaydoctors/",
      data: specidObj,
    }).then(function (doctors) {
      $scope.doctors = doctors.data;
      console.log($scope.doctors);
    });
  };
  $scope.bookAppointment = function () {
    $scope.appDate = $filter("date")($scope.appDate, "yyyy-MM-dd");
    console.log($scope.appDate);
    let user = JSON.parse(localStorage.getItem("username"));
    let auth = JSON.parse(localStorage.getItem("authkey"));
    bookAppObj = {
      username: user,
      auth_key: auth,
      symptoms: $scope.symptoms,
      specialist: $scope.specialist,
      doctor_app: $scope.drAvailable,
      date_app: $scope.appDate,
      time_app: $scope.appTime,
    };
    if (
      $scope.symptoms == undefined ||
      $scope.symptoms == "" ||
      $scope.specialist == undefined ||
      $scope.specialist == "" ||
      $scope.drAvailable == undefined ||
      $scope.drAvailable == "" ||
      $scope.appDate == undefined ||
      $scope.appDate == "" ||
      $scope.appTime == undefined ||
      $scope.appTime == ""
    ) {
      Swal.fire({
        title: "Input Fields are Empty!",
        allowOutsideClick: () => {
          const popup = Swal.getPopup();
          popup.classList.remove("swal2-show");
          setTimeout(() => {
            popup.classList.add("animate__animated", "animate__headShake");
          });
          setTimeout(() => {
            popup.classList.remove("animate__animated", "animate__headShake");
          }, 500);
          return;
        },
      });
      return;
    } else {
      $http({
        method: "POST",
        url: "http://10.21.66.37:8000/patients/bookappointment/",
        data: bookAppObj,
      }).then(function (res) {
        if (res.data.success == true) {
          $scope.symptoms = "";
          $scope.specialist = "";
          $scope.drAvailable = "";
          $scope.appDate = "";
          $scope.appTime = "";
          Swal.fire({
            icon: "success",
            // position: "top-end",
            title: "Payment Done & Appointment request generated Successfully!",
            showConfirmButton: false,
            timer: 2500,
          });
        }
        if (res.data.success == false) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res.data.message,
          });
        }
      });
    }
  };
});

app.controller("recp_login_ctrl", function ($scope, $http, $location) {
  document.getElementById("mainbar").style.display = "none";
  $scope.login = function () {
    $scope.username;
    $scope.password;

    var recploginobj = {
      username: $scope.username,
      pass: $scope.password,
    };

    if (
      $scope.username == undefined ||
      $scope.password == undefined ||
      $scope.username == "" ||
      $scope.password == ""
    ) {
      Swal.fire({
        title: "Input Fields are Empty!",
        allowOutsideClick: () => {
          const popup = Swal.getPopup();
          popup.classList.remove("swal2-show");
          setTimeout(() => {
            popup.classList.add("animate__animated", "animate__headShake");
          });
          setTimeout(() => {
            popup.classList.remove("animate__animated", "animate__headShake");
          }, 500);
          return;
        },
      });
      return;
    } else
      $http({
        method: "POST",
        url: "http://10.21.66.37:8000/receptionist/login/",
        data: recploginobj,
      }).then(function (res) {
        if (res.data.success == true) {
          Swal.fire({
            icon: "success",
            position: "top-end",
            title: "Login Successful",
            showConfirmButton: false,
            timer: 1500,
          });
          $scope.username = res.data.user;
          $scope.authkey = res.data.authorization_key;
          // console.log($scope.username);
          localStorage.setItem("username", JSON.stringify($scope.username));
          localStorage.setItem("authkey", JSON.stringify($scope.authkey));
          $location.path("/recp_dash");
        }
        if (res.data.success == false) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res.data.message,
          });
        }
      });
  };
});

app.controller("recp_dash_ctrl", function ($scope, $http, $location) {
  var user = JSON.parse(localStorage.getItem("username"));
  var auth = JSON.parse(localStorage.getItem("authkey"));
  if (user && auth) {
    document.getElementById("mainbar").style.display = "none";
    let user = JSON.parse(localStorage.getItem("username"));
    let auth = JSON.parse(localStorage.getItem("authkey"));
    userobj = {
      username: user,
      auth_key: auth,
    };
    $http({
      method: "POST",
      url: "http://10.21.66.37:8000/receptionist/dashboard/",
      data: userobj,
    }).then(function (response) {
      if (response.data.status == 401) {
        Swal.fire({
          icon: "error",
          title: "You haven't logged in ?",
          text: response.data.message,
        });
        $location.path("/recp_login");
      } else {
        $scope.patname = function () {
          $http
            .get(
              "http://10.21.66.37:8000/receptionist/showpendingappointments_name/"
            )
            .then(function (response) {
              console.log(response.data);
              $scope.recpnotify = response.data;
            });
        };
        $scope.patname();
        $scope.logout = function () {
          let auth = JSON.parse(localStorage.getItem("authkey"));
          recplogout = {
            auth_key: auth,
          };
          $http({
            method: "POST",
            url: "http://10.21.66.37:8000/receptionist/logout/",
            data: recplogout,
          });
          Swal.fire({
            icon: "success",
            // position: "top-end",
            title: "Logged Out Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          localStorage.removeItem("username");
          localStorage.removeItem("authkey");
          $location.path("/home");
        };
      }
    });
  } else {
    $location.path("/recp_login");
    Swal.fire("You haven't logged in ?", "Login First", "error");
  }
});

app.controller("recp_appRequest_ctrl", function ($scope, $http) {
  $scope.patients = function () {
    $http
      .get("http://10.21.66.37:8000/receptionist/showpendingappointments_name/")
      .then(function (response) {
        $scope.appointments = response.data;
        if ($scope.appointments.length == 0) {
          $scope.recpaptdata = true;
        }
      });
  };
  $scope.patients();
  $scope.viewApp = function (index) {
    let user = JSON.parse(localStorage.getItem("username"));
    let auth = JSON.parse(localStorage.getItem("authkey"));
    indexobj = {
      id: index,
      auth_key: auth,
      username: user,
    };
    $http({
      method: "POST",
      url: "http://10.21.66.37:8000/receptionist/showpendingappointments/",
      data: indexobj,
    }).then(function (response) {
      $scope.ptdata = response.data;
    });
  };
  $scope.ptdata;
  $scope.forwardreq = function (index) {
    let user = JSON.parse(localStorage.getItem("username"));
    let auth = JSON.parse(localStorage.getItem("authkey"));
    indexobj = {
      username: user,
      auth_key: auth,
      id: index,
      aptid: $scope.appointments[index].id,
    };
    $http({
      method: "POST",
      url: "http://10.21.66.37:8000/receptionist/receptionistforward/",
      data: indexobj,
    }).then(function (response) {
      $scope.drname = response.data.dr_name;
      console.log($scope.drname);
      Swal.fire({
        icon: "success",
        // position: "top-end",
        title: $scope.drname,
        showConfirmButton: false,
        timer: 1500,
      });
      $scope.patients();
    });
  };

  $scope.viewmedhistory = function (index) {
    let user = JSON.parse(localStorage.getItem("username"));
    let auth = JSON.parse(localStorage.getItem("authkey"));
    viewmedobj = {
      username: user,
      auth_key: auth,
      id: index,
    };
    $http({
      method: "POST",
      url: "http://10.21.66.37:8000/receptionist/showptpendingmedicaldata/",
      data: viewmedobj,
    }).then(function (response) {
      $scope.medform = response.data;
      console.log($scope.medform);
    });
  };

  $scope.recprejmsg = function (index, msg) {
    let user = JSON.parse(localStorage.getItem("username"));
    let auth = JSON.parse(localStorage.getItem("authkey"));
    console.log($scope.recprejectmsg);
    recprejobj = {
      username: user,
      auth_key: auth,
      reason: msg,
      id: index,
      aptid: $scope.appointments[index].id,
    };
    console.log(recprejobj);
    $http({
      method: "POST",
      url: "http://10.21.66.37:8000/receptionist/receptionistreject/",
      data: recprejobj,
    }).then(function (response) {
      $scope.recpReason = response.data.message;
      console.log($scope.recpReason);
      Swal.fire({
        icon: "success",
        // position: "top-end",
        title: $scope.recpReason,
        showConfirmButton: false,
        timer: 2000,
      });
      $scope.patients();
    });
  };
});

app.controller("recp_drlist_ctrl", function ($http, $scope) {
  $http
    .get("http://10.21.66.37:8000/receptionist/showalldoctors_name/")
    .then(function (response) {
      $scope.doctors = response.data;
      console.log($scope.doctors);
    });

  $scope.drprofile = function (index) {
    let user = JSON.parse(localStorage.getItem("username"));
    let auth = JSON.parse(localStorage.getItem("authkey"));
    drindex = {
      id: index,
      username: user,
      auth_key: auth,
    };
    console.log(drindex);
    $http({
      method: "POST",
      url: "http://10.21.66.37:8000/receptionist/showdoctordata/",
      data: drindex,
    }).then(function (response) {
      $scope.profile = response.data;
      console.log($scope.profile);
    });
  };
  $scope.loadSpecialists = function () {
    $http
      .get("http://10.21.66.37:8000/doctors/displayspecializations/")
      .then(function (specialists) {
        $scope.specialists = specialists.data;
        console.log(specialists.data);
      });
  };
  $scope.loadDoctor = function () {
    let user = JSON.parse(localStorage.getItem("username"));
    let auth = JSON.parse(localStorage.getItem("authkey"));
    specialist = $scope.specialist;
    console.log(specialist);
    specidObj = {
      id: specialist,
      auth_key: auth,
      username: user,
    };
    $http({
      method: "POST",
      url: "http://10.21.66.37:8000/doctors/displaydoctors/",
      data: specidObj,
    }).then(function (doctors) {
      $scope.doctors = doctors.data;
      console.log($scope.doctors);
    });
  };
});

app.controller("recp_ptlist_ctrl", function ($http, $scope) {
  $http
    .get("http://10.21.66.37:8000/receptionist/showallpatients_name/")
    .then(function (response) {
      $scope.patientsdata = response.data;
      console.log($scope.patientsdata);
    });

  $scope.ptprofile = function (index) {
    let user = JSON.parse(localStorage.getItem("username"));
    let auth = JSON.parse(localStorage.getItem("authkey"));
    ptindex = {
      id: index,
      auth_key: auth,
      username: user,
    };
    console.log(ptindex);
    $http({
      method: "POST",
      url: "http://10.21.66.37:8000/receptionist/showpatientdata/",
      data: ptindex,
    }).then(function (response) {
      $scope.patientprofile = response.data;
      console.log($scope.patientprofile);
    });
  };
});

app.controller("drapp_req_ctrl", function ($scope, $http) {
  var user = JSON.parse(localStorage.getItem("username"));
  let auth = JSON.parse(localStorage.getItem("authkey"));
  druserobj = {
    username: user,
    auth_key: auth,
  };
  console.log(druserobj);
  $scope.ptappname = function () {
    $http({
      method: "POST",
      url: "http://10.21.66.37:8000/doctors/drpendingappointments/",
      data: druserobj,
    }).then(function (response) {
      $scope.drappname = response.data;
      if ($scope.drappname.length == 0) {
        $scope.draptreq = true;
      }
    });
  };
  $scope.ptappname();
  $scope.viewdrapp = function (index) {
    drviewappobj = {
      id: index,
      username: user,
      auth_key: auth,
    };
    console.log(drviewappobj);
    $http({
      method: "POST",
      url: "http://10.21.66.37:8000/doctors/drappointmentdata/",
      data: drviewappobj,
    }).then(function (response) {
      $scope.drviewapp = response.data;
      console.log($scope.drviewapp);
      console.log(response.data.ptname);
    });
  };
  $scope.fixapp = function (index) {
    ptid = {
      id: index,
      username: user,
      auth_key: auth,
      aptid: $scope.drappname[index].id,
    };
    $http({
      method: "POST",
      url: "http://10.21.66.37:8000/doctors/doctorfix/",
      data: ptid,
    }).then(function (response) {
      $scope.approvemsg = response.data.message;
      Swal.fire({
        icon: "success",
        // position: "top-end",
        title: $scope.approvemsg,
        showConfirmButton: false,
        timer: 1500,
      });
      $scope.ptappname();
    });
  };
  $scope.drrejmsg = function (index, drrejectmsg) {
    drrejmsg = {
      id: index,
      reason: drrejectmsg,
      username: user,
      auth_key: auth,
      aptid: $scope.drappname[index].id,
    };
    $http({
      method: "POST",
      url: "http://10.21.66.37:8000/doctors/doctorreject/",
      data: drrejmsg,
    }).then(function (response) {
      $scope.drmsg = response.data.message;
      Swal.fire({
        icon: "success",
        // position: "top-end",
        title: $scope.drmsg,
        showConfirmButton: false,
        timer: 1500,
      });
      $scope.ptappname();
    });
  };
});

app.controller("dr_fixed_ctrl", function ($scope, $http) {
  $scope.drfixedapt = function () {
    var user = JSON.parse(localStorage.getItem("username"));
    let auth = JSON.parse(localStorage.getItem("authkey"));
    fixedaptobj = {
      username: user,
      auth_key: auth,
    };
    console.log(fixedaptobj);
    $http({
      method: "POST",
      url: "http://10.21.66.37:8000/doctors/showdrfixappointments/",
      data: fixedaptobj,
    }).then(function (response) {
      $scope.fixedappointments = response.data;
      console.log($scope.fixedappointments);
    });
  };
  $scope.drfixedapt();
  $scope.viewappformfixed = function (index) {
    var user = JSON.parse(localStorage.getItem("username"));
    let auth = JSON.parse(localStorage.getItem("authkey"));
    drfixviewobj = {
      id: index,
      username: user,
      auth_key: auth,
    };
    $http({
      method: "POST",
      url: "http://10.21.66.37:8000/doctors/drfixaptdata/",
      data: drfixviewobj,
    }).then(function (response) {
      $scope.drfixviewdata = response.data;
      console.log(response.data);
      console.log($scope.drfixviewdata.time_app);
    });
  };
  $scope.drfixedviewmed = function (index) {
    var user = JSON.parse(localStorage.getItem("username"));
    let auth = JSON.parse(localStorage.getItem("authkey"));
    drfixmedobj = {
      id: index,
      username: user,
      auth_key: auth,
    };
    $http({
      method: "POST",
      url: "http://10.21.66.37:8000/doctors/drfixmedicalhistory/",
      data: drfixmedobj,
    }).then(function (response) {
      $scope.drfixviewmeddata = response.data;
    });
  };
  $scope.uploadpres = function (index) {
    var user = JSON.parse(localStorage.getItem("username"));
    let auth = JSON.parse(localStorage.getItem("authkey"));
    presobj = {
      id: index,
      username: user,
      auth_key: auth,
    };
    $scope.fixindex = index;
    console.log(presobj);
    $http({
      method: "POST",
      url: "http://10.21.66.37:8000/doctors/getprescriptiondata/",
      data: presobj,
    }).then(function (response) {
      $scope.presdata = response.data;
      console.log($scope.presdata);
      // console.log($scope.presdata[index].id);
    });
  };
  $scope.drupload = function (medname, labtest) {
    var user = JSON.parse(localStorage.getItem("username"));
    let auth = JSON.parse(localStorage.getItem("authkey"));
    ptpresobj = {
      id: $scope.fixindex,
      username: user,
      auth_key: auth,
      medications: medname,
      tests: labtest,
    };
    console.log(ptpresobj);
    $http({
      method: "POST",
      url: "http://10.21.66.37:8000/doctors/uploadprescription/",
      data: ptpresobj,
    }).then(function (response) {
      Swal.fire({
        icon: "success",
        // position: "top-end",
        title: "Prescription Uploaded Successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      $scope.drfixedapt();
    });
  };
  if ($scope.fixedappointments.length == 0) {
    $scope.nulldata = true;
  }
});

app.controller("dr_ptlist_ctrl", function ($scope, $http) {
  var user = JSON.parse(localStorage.getItem("username"));
  let auth = JSON.parse(localStorage.getItem("authkey"));
  ptdrobj = {
    username: user,
    auth_key: auth,
  };
  $http({
    method: "POST",
    url: "http://10.21.66.37:8000/doctors/showdrpatients/",
    data: ptdrobj,
  }).then(function (response) {
    $scope.ptdr = response.data;
    console.log($scope.ptdr);
  });
  $scope.viewvisits = function (index) {
    var user = JSON.parse(localStorage.getItem("username"));
    let auth = JSON.parse(localStorage.getItem("authkey"));
    visitobj = {
      username: user,
      auth_key: auth,
      id: index,
    };
    $http({
      method: "POST",
      url: "http://10.21.66.37:8000/doctors/showdrptvisits/",
      data: visitobj,
    }).then(function (response) {
      $scope.visitdates = response.data;
      console.log($scope.visitdates);
    });
  };
  $scope.drptprofile = function (index) {
    let user = JSON.parse(localStorage.getItem("username"));
    let auth = JSON.parse(localStorage.getItem("authkey"));
    drptindex = {
      id: index,
      username: user,
      auth_key: auth,
    };
    console.log(drptindex);
    $http({
      method: "POST",
      url: "http://10.21.66.37:8000///",
      data: drptindex,
    }).then(function (response) {
      $scope.drpatientprofile = response.data;
      console.log($scope.drpatientprofile);
    });
  };
});
