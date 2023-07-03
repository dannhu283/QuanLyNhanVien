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

  //hiển thị danh sách nhân viên
  display(staffs);
}
// ẩn bảng modal

//hàm nhận giá trị và hiển thị ra giao diện
function display(staffs) {
  let html = staffs.reduce((result, value) => {
    return (
      result +
      `
     <tr>
       <td>${value.account}</td>
       <td>${value.name}</td>
       <td>${value.email}</td>
       <td>${value.workDay}</td>
       <td>${value.position}</td>
       <td>${value.totalSalary()}</td>
       <td>${value.ratings()}</td>
       <td>
       <button
         class="btn btn-warning"
       >
         Chỉnh sửa
       </button>
       <button
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
  if (value < 1000000 || value > 20000000) {
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
    document.getElementById("tbChucVu").style = "display: block";
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
