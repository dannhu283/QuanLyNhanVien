// danh sách nhân viên
let staffs = [];

//thêm nhân viên
function addStaff() {
  // kiểm tra validate để kiểm tra form và tạo ra nhân viên
  let staff = validate();
  if (!staff) {
    return;
  }
  //thêm nhân viên vào danh sách
  staffs.push(staff);

  //ẩn modal sau khi nhập đúng hết các thông tin
  $("#myModal").modal("hide");

  //hiển thị danh sách nhân viên
  display(staffs);

  //reset form
  resetForm();
}

//tìm kiếm nhân viên
function findStaff() {
  //dom
  let search = document.getElementById("searchName").value;
  search = search.trim().toLowerCase();
  //lọc loại nhân viên trùng khớp
  let newStaffs = staffs.filter((value) => {
    let type = value.ratings().trim().toLowerCase();
    return type.includes(search);
  });
  //hiển thị danh sách loại nhân viên phù hợp vừa tìm
  if (newStaffs.length > 0) {
    display(newStaffs);
  } else {
    document.getElementById(
      "showAlert"
    ).innerHTML = `📣📣📣 Không có nhân viên nào xếp loại này`;
    document.getElementById("showAlert").style.fontSize = "20px";
  }
}

// //hàm xóa nhân viên
function removeStaff(staffAccount) {
  staffs = staffs.filter((value) => {
    return value.account !== staffAccount;
  });

  display(staffs);
}

function selectStudent(staffAccount) {
  //hiện bảng login để cập nhật thông tin mới
  $("#myModal").modal("show");
  // Tìm phần tử staff có account khớp với giá trị của staffAccount
  let staff = staffs.find((value) => {
    return value.account === staffAccount;
  });

  // Fill thông tin của student lên giao diện
  document.getElementById("tknv").value = staff.account;
  document.getElementById("name").value = staff.name;
  document.getElementById("email").value = staff.email;
  document.getElementById("password").value = staff.pass;
  document.getElementById("datepicker").value = staff.workDay;
  document.getElementById("luongCB").value = staff.salary;
  document.getElementById("chucvu").value = staff.position;
  document.getElementById("gioLam").value = staff.worktTme;

  // disable input account và button thêm nhân viên
  document.getElementById("tknv").disabled = true;
  document.getElementById("btnThemNV").disabled = true;
}

//hàm cập nhật
function updateStaff() {
  let account = document.getElementById("tknv").value;
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let pass = document.getElementById("password").value;
  let workDay = document.getElementById("datepicker").value;
  let salary = document.getElementById("luongCB").value;
  let position = document.getElementById("chucvu").value;
  let worktTme = document.getElementById("gioLam").value;

  let staff = new Staff(
    account,
    name,
    email,
    pass,
    workDay,
    salary,
    position,
    worktTme
  );
  let index = staffs.findIndex((value) => {
    return value.account === account;
  });

  //validation
  staff = validate();
  if (!staff) {
    return;
  }

  //Thay thế phần tử thứ index cho object student mới tạo
  staffs[index] = staff;
  //ẩn modal login sau khi cập nhật xong
  $("#myModal").modal("hide");

  //hiển thị
  display(staffs);

  //resetform
  resetForm();
}

//hàm nhận giá trị và hiển thị ra giao diện
function display(staffs) {
  let html = staffs.reduce((result, value) => {
    return (
      result +
      `
     <tr id="showAlert">
       <td>${value.account}</td>
       <td>${value.name}</td>
       <td>${value.email}</td>
       <td>${value.workDay}</td>
       <td>${value.position}</td>
       <td>${value.totalSalary()}</td>
       <td>${value.ratings()}</td>
       <td>
       <button onclick="selectStudent('${value.account}')"
         class="btn btn-warning"
       >
         Chỉnh sửa
       </button>
       <button onclick="removeStaff('${value.account}')"
         class="btn btn-danger"
       >
         Xoá
       </button>
     </td>
     </tr>
    `
    );
  }, "");

  document.getElementById("tableDanhSach").innerHTML = html;
}

// hàm reset giá trị của form
function resetForm() {
  document.getElementById("tknv").value = "";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("datepicker").value = "";
  document.getElementById("luongCB").value = "";
  document.getElementById("chucvu").value = "";
  document.getElementById("gioLam").value = "";
  //mở lại giá trị account và nút thêm do trước đó disable
  document.getElementById("tknv").disabled = false;
  document.getElementById("btnThemNV").disabled = false;
}
// Hàm kiểm tra giá trị có rỗng hay không
function isRequired(value) {
  if (!value.trim()) {
    // Chuỗi rỗng
    return false;
  }
  return true;
}

//hàm kiểm tra tài khoản giới hạn
function isCharacter(value) {
  let regex = /^\d{4,6}$/;
  return regex.test(value);
}

//hàm kiểm tra tên nhân viên
function isName(value) {
  let regex =
    /^[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ\s]+$/;
  return regex.test(value);
}

//hàm kiểm tra email
function isEmail(value) {
  let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regex.test(value);
}

//hàm kiểm tra định dạng mật khẩu
function isPassword(value) {
  let regex = /^(?=.*\d)(?=.*[A-Z])(?=.*\W).{6,10}$/;
  return regex.test(value);
}

//hàm kiểm tra lương
function isSalary(value) {
  if (isNaN(value)) {
    return false;
  }
  if (value < 1e6 || value > 2e7) {
    return false;
  }
  return true;
}

//hàm kiêm tra giờ làm
function isWorkTime(value) {
  if (isNaN(value)) {
    return false;
  }
  if (value < 80 || value > 200) {
    return false;
  }
  return true;
}

//hàm kiểm tra thông tin của nhân viên có hợp lệ hay không
function validate() {
  let account = document.getElementById("tknv").value;
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let pass = document.getElementById("password").value;
  let workDay = document.getElementById("datepicker").value;
  let salary = document.getElementById("luongCB").value;
  let position = document.getElementById("chucvu").value;
  let worktTme = document.getElementById("gioLam").value;

  let isValid = true;

  // xác thực tài khoản không được để trống
  if (!isRequired(account)) {
    isValid = false;
    document.getElementById("tbTKNV").style = "display: block";
    document.getElementById(
      "tbTKNV"
    ).innerHTML = `Tài khoản không được để trống`;
  } else if (!isCharacter(account)) {
    isValid = false;
    document.getElementById("tbTKNV").style = "display: block";
    document.getElementById(
      "tbTKNV"
    ).innerHTML = `Tài khoản giới hạn từ 4-6 ký số`;
  } else {
    document.getElementById("tbTKNV").innerHTML = "";
  }
  //xác thực tên không được để trống
  if (!isRequired(name)) {
    isValid = false;
    document.getElementById("tbTen").style = "display: block";
    document.getElementById("tbTen").innerHTML = `Tên không được để trống`;
  } else if (!isName(name)) {
    isValid = false;
    document.getElementById("tbTen").style = "display: block";
    document.getElementById("tbTen").innerHTML = `Tên phải là chữ `;
  } else {
    document.getElementById("tbTen").innerHTML = "";
  }
  //xác thực email không để trống
  if (!isRequired(email)) {
    isValid = false;
    document.getElementById("tbEmail").style = "display: block";
    document.getElementById("tbEmail").innerHTML = `Email không được để trống`;
  } else if (!isEmail(email)) {
    isValid = false;
    document.getElementById("tbEmail").style = "display: block";
    document.getElementById("tbEmail").innerHTML = `Email chưa đúng định dạng`;
  } else {
    document.getElementById("tbEmail").innerHTML = "";
  }
  //xác thực mật khẩu không để trống và mật Khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)
  if (!isRequired(pass)) {
    isValid = false;
    document.getElementById("tbMatKhau").style = "display: block";
    document.getElementById(
      "tbMatKhau"
    ).innerHTML = `Mật khẩu không được để trống`;
  } else if (!isPassword(pass)) {
    isValid = false;
    document.getElementById("tbMatKhau").style = "display: block";
    document.getElementById(
      "tbMatKhau"
    ).innerHTML = `Mật khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)`;
  } else {
    document.getElementById("tbMatKhau").innerHTML = "";
  }

  //xác thực ngày không được để trống
  if (!isRequired(workDay)) {
    isValid = false;
    document.getElementById("tbNgay").style = "display: block";
    document.getElementById(
      "tbNgay"
    ).innerHTML = `Ngày làm không được để trống`;
  } else {
    document.getElementById("tbNgay").innerHTML = "";
  }

  //xác thực Lương không để trống và từ  1 000 000 - 20 000 000
  if (!isRequired(salary)) {
    isValid = false;
    document.getElementById("tbLuongCB").style = "display: block";
    document.getElementById(
      "tbLuongCB"
    ).innerHTML = `Lương cơ bản không được để trống`;
  } else if (!isSalary(+salary)) {
    isValid = false;
    document.getElementById("tbLuongCB").style = "display: block";
    document.getElementById(
      "tbLuongCB"
    ).innerHTML = `Lương cơ bản chỉ từ 1.000.000 - 20.000.000`;
  } else {
    document.getElementById("tbLuongCB").innerHTML = "";
  }
  //xác thực chức vụ phải chọn
  if (!isRequired(position)) {
    isValid = false;
    document.getElementById("tbChucVu").style = "display: block";
    document.getElementById("tbChucVu").innerHTML = "Vui lòng chọn chức vụ";
  } else {
    document.getElementById("tbChucVu").innerHTML = "";
  }
  //xác thực số giờ làm không được để trống và từ 80 - 200 giờ
  if (!isRequired(worktTme)) {
    isValid = false;
    document.getElementById("tbGiolam").style = "display: block";
    document.getElementById(
      "tbGiolam"
    ).innerHTML = `Số giờ làm không được để trống`;
  } else if (!isWorkTime(+worktTme)) {
    isValid = false;
    document.getElementById(
      "tbGiolam"
    ).innerHTML = `Số giờ làm giao động từ 80->200`;
  } else {
    document.getElementById("tbGiolam").innerHTML = "";
  }
  if (isValid) {
    //form hợp lệ,tạo ra và trả về nhân viên
    let staff = new Staff(
      account,
      name,
      email,
      pass,
      workDay,
      +salary,
      position,
      +worktTme
    );
    return staff;
  }

  //form không hợp lệ,không tạo ra đối tượng staff
  return undefined;
}
