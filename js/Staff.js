function Staff(
  account,
  name,
  email,
  pass,
  workDay,
  salary,
  position,
  worktTme
) {
  this.account = account;
  this.name = name;
  this.email = email;
  this.pass = pass;
  this.workDay = workDay;
  this.salary = salary;
  this.position = position;
  this.worktTme = worktTme;
}
Staff.prototype.ratings = function () {
  if (this.worktTme >= 192) {
    return "Nhân Viên Xuất Sắc";
  }
  if (this.worktTme >= 176) {
    return "Nhân Viên Giỏi";
  }
  if (this.worktTme >= 160) {
    return "Nhân Viên Khá";
  } else {
    return "Nhân Viên Trung Bình";
  }
};
Staff.prototype.totalSalary = function () {
  if (this.position === "Sếp") {
    return this.salary * 3;
  }
  if (this.position === "Trưởng phòng") {
    return this.salary * 2;
  } else {
    return this.salary;
  }
};
