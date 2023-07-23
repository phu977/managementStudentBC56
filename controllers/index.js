/**
    MVC: Model, View, Controller (Cách tổ chức thư mục và tập tin)
    Controllers: Chứa các file js điều hướng các giao diện cùng tên với nó 
    Views: file html chứa các webpage
    Models: Là nơi chứa các file format của object (file prototype, class, lớp đối tượng)
 */
//Mảng này sẽ quản lý tất cả thông tin sinh viên trên giao diện index.html
var arrSinhVien = [];

document.querySelector("#btnThemSinhVien").onclick = function () {
  var sinhVienNew = new SinhVien();
  sinhVienNew.maSinhVien = document.querySelector("#maSinhVien").value;
  sinhVienNew.tenSinhVien = document.querySelector("#tenSinhVien").value;
  sinhVienNew.diemRenLuyen = document.querySelector("#diemRenLuyen").value;
  sinhVienNew.email = document.querySelector("#email").value;
  sinhVienNew.soDienThoai = document.querySelector("#soDienThoai").value;
  sinhVienNew.loaiSinhVien = document.querySelector("#loaiSinhVien").value;

//   kiểm tra mảng trỗng 
// trim phương thức loại bỏ khoảng trống đầu và cuối của chuỗi
var valid = validation.kiemTraRong(sinhVienNew.maSinhVien,'maSinhVien') & validation.kiemTraRong(sinhVienNew.tenSinhVien,'tenSinhVien');

// kiểm tra định dạng 
valid = valid & validation.kiemtraTatCaKyTu(sinhVienNew.tenSinhVien,'tenSinhVien')&validation.kiemTraEmail(sinhVienNew.email,'email')&validation.kiemTraNumber(sinhVienNew.diemRenLuyen,'diemRenLuyen');

//Kiểm độ dài và giá trị
valid = valid & validation.kiemTraDoDai(sinhVienNew.maSinhVien,'maSinhVien',4,6) & validation.kiemTraGiaTri(sinhVienNew.diemRenLuyen,'diemRenLuyen',0,10);

if(!valid) {
    return;
}
  console.log(sinhVienNew);
  //Thêm sinh viên vào mảng
  arrSinhVien.push(sinhVienNew);
  console.log(arrSinhVien); // arrSinhVien = [{...},{...},{...}]
  // index                                      0     1     2     => Xoá : arrSinhVien.splice(2,1);
  renderTableSinhVien(arrSinhVien);

  //Lưu mảng sinh viên vào storage
  saveStorageArrSinhVien();
};
/**
 * Hàm nhận vào tham số là arrSV [{...},{...},{...}]
 * @param {*} arrSV là mảng chứa các object sinhVien : arrSV = [{maSinhVien:1,...},{maSinhVien:2,...},...]
 */
function renderTableSinhVien(arrSV) {
  var outputHTML = "";
  for (var index = 0; index < arrSV.length; index++) {
    var sinhVien = arrSV[index];
    outputHTML += `
            <tr>
                <td>${sinhVien.maSinhVien}</td>
                <td>${sinhVien.tenSinhVien}</td>
                <td>${sinhVien.email}</td>
                <td>${sinhVien.soDienThoai}</td>
                <td>${sinhVien.loaiSinhVien}</td>
                <td>
                    <button class="btn btn-danger" onclick="xoaSinhVien('${index}')">Xoá</button>
                    <button class="btn btn-primary mx-2" onclick="suaSinhVien('${index}')">Sửa</button>
                </td>
            </tr>
        `;
  }
  document.querySelector("#tblSinhVien").innerHTML = outputHTML;
  /*
        output = '<tr>....</tr> <tr>....</tr>'
    */
}

function xoaSinhVien(indexDel) {
  arrSinhVien.splice(indexDel, 1);
  //Sau khi xoá thì tạo lại table
  renderTableSinhVien(arrSinhVien);
}
//                 0                  1     2
//arrSinhVien = [{maSinhVien:1,...},{...},{...}]
function suaSinhVien(indexEdit) {
  var svEdit = arrSinhVien[indexEdit];
  document.querySelector("#maSinhVien").value = svEdit.maSinhVien;
  document.querySelector("#tenSinhVien").value = svEdit.tenSinhVien;
  document.querySelector("#soDienThoai").value = svEdit.soDienThoai;
  document.querySelector("#email").value = svEdit.email;
  document.querySelector("#loaiSinhVien").value = svEdit.loaiSinhVien;
  document.querySelector("#diemRenLuyen").value = svEdit.diemRenLuyen;
}

//Phương thức lưu vào application storage
function saveStorageArrSinhVien() {
  //Chuyển arr về chuỗi
  var strSinhVien = JSON.stringify(arrSinhVien); // '[{},{},{}]'
  //Lưu string vào storage
  localStorage.setItem("arrSinhVien", strSinhVien);
}

//Phương thức lấy dữ liệu từ localstorage
function getStorageJSON(name) {
  if (localStorage.getItem(name)) {
    //Nếu có storage name đó thì mới đi vào if
    var str = localStorage.getItem(name);
    var jsonValue = JSON.parse(str);

    console.log("jsonValue", jsonValue);
    return jsonValue;
  }
  return null;
}

window.onload = function () {
  //Sự kiện khi windown load xong html css js
  //Khi trang web load lên thì lấy dữ liệu từ storage arrSinhVien nếu có thì gán vào
  if (getStorageJSON("arrSinhVien")) {
    //Lấy ra
    arrSinhVien = getStorageJSON("arrSinhVien");
    //Tạo table
    renderTableSinhVien(arrSinhVien);
  }
//   var arrTen = [
//     {ten:'C',tuoi:17},
//     {ten:'B',tuoi:5},
//     {ten:'E',tuoi:15},
//     {ten:'A',tuoi:4},
//     {ten:'A',tuoi:3}
//   ]
// //   desc sắp xếp giảm dần
// // asc sắp xếp tăng dần
// // _.orderBy(arrTen,['ten','tuoi']); Sắp xếp theo kí tự tăng dần nếu giống nhau thì qua tuổi từ nhỏ đến lớn 

//   var arrSortTen = _.orderBy(arrTen,['ten','tuoi'],['desc']);
//   console.log(arrSortTen);
// //   console.log(_);
};

//index:           0                     1                         2
//arrSinhVien = [{maSinhVien:1,...},{maSinhVien:2,...},{maSinhVien:3...}]
//Cập nhật
document.querySelector("#btnLuuThongTin").onclick = function () {
  //Lấy thông tin từ người dùng sau khi cập nhật
  var svUpdate = new SinhVien();
  svUpdate.maSinhVien = document.querySelector("#maSinhVien").value;
  svUpdate.tenSinhVien = document.querySelector("#tenSinhVien").value;
  svUpdate.diemRenLuyen = document.querySelector("#diemRenLuyen").value;
  svUpdate.soDienThoai = document.querySelector("#soDienThoai").value;
  svUpdate.loaiSinhVien = document.querySelector("#loaiSinhVien").value;
  svUpdate.email = document.querySelector("#email").value;
  var indexUpdate = -1;
  for (var index = 0; index < arrSinhVien.length; index++) {
    //Nếu mã sinh viên trong mảng === với mã sinh viên trên form thì lưu lại index ở vị trí đó
    if (arrSinhVien[index].maSinhVien === svUpdate.maSinhVien) {
      indexUpdate = index;
      break;
    }
  }
  if (indexUpdate !== -1) {
    //Khi tìm thấy index sinh viên trong mảng có mã = với sinh viên trên giao diện thì cập nhật mảng
    arrSinhVien[indexUpdate].tenSinhVien = svUpdate.tenSinhVien;
    arrSinhVien[indexUpdate].email = svUpdate.email;
    arrSinhVien[indexUpdate].soDienThoai = svUpdate.soDienThoai;
    arrSinhVien[indexUpdate].loaiSinhVien = svUpdate.loaiSinhVien;
    arrSinhVien[indexUpdate].diemRenLuyen = svUpdate.diemRenLuyen;
    //Render lại table
    renderTableSinhVien(arrSinhVien);
    //Lưu vào localstorage
    saveStorageArrSinhVien();
  }
};

//index:           0                     1                         2
//arrSinhVien = [{maSinhVien:1,...},{maSinhVien:2,...},{maSinhVien:3...}]
//Tìm kiếm
// toLowerCase dùng chuyển tất cả chữ chuyển về chữ thường
// toUpperCase dùng chuyển tất cả chữ về chữ in hoa
document.querySelector("#keyword").oninput = function () {
  var tuKhoa = document.querySelector("#keyword").value;
  var loaiTimKiem = document.querySelector("#loaiTimKiem").value;
  if (tuKhoa === "") {
    renderTableSinhVien(arrSinhVien);
    return; //Dừng hàm
  }
  //Kết quả tìm kiếm là 1 mảng sinh viên
  var arrResult = []; // [{...}]
  if (loaiTimKiem === "sdt") {
    for (var index = 0; index < arrSinhVien.length; index++) {
      //Mỗi lần duyệt lấy số điện thoại của từng sinh viên trong mảng kiêm tra với từ khoá
      // search tìm ra và xuất ra vi trí
      if (arrSinhVien[index].soDienThoai.search(tuKhoa) !== -1) {
        arrResult.push(arrSinhVien[index]);
      }
    }
  } else if (loaiTimKiem === "ten") {
    for (var index = 0; index < arrSinhVien.length; index++) {
      //Mỗi lần duyệt lấy tên của từng sinh viên trong mảng kiêm tra với từ khoá
      var tenSv = arrSinhVien[index].tenSinhVien;
      tenSv = stringToSlug(tenSv); //Tran van B => tran-van-b
      tuKhoa = stringToSlug(tuKhoa); //TRAN => tran
      if (arrSinhVien[index].tenSinhVien.search(tuKhoa) !== -1) {
        arrResult.push(arrSinhVien[index]);
      }
    }
  }

  //Gọi hàm tạo table sinh viên từ sinh viên tìm kiếm
  renderTableSinhVien(arrResult);
};

document.querySelector("#loaiTimKiem").onchange = function (event) {
  var loaiTimKiem = event.target.value;
  var labelTag = document.querySelector('label[for="keyword"]');
  if (loaiTimKiem == "sdt") {
    labelTag.innerHTML = "Nhập số điện thoại";
  } else {
    labelTag.innerHTML = "Nhập vào tên";
  }
};

// so sánh giá trị string thì ta so sánh từng vị trí của string

// _.orderBy sắp xếp cho đối tượng

var arrTh = document.querySelectorAll('th[data-title]');

for(var index = 0 ; index < arrTh.length; index++){
    arrTh[index].onclick = function(event) {
        var tenThuocTinh = event.target.getAttribute('data-title'); //Lấy thuốc tính khi click vào
        var order = event.target.getAttribute('data-order');
        // giả sử click vào cột tên sinh viên 
        arrSinhVien = _.orderBy(arrSinhVien,[tenThuocTinh],[order]);
        // sau khi sắp xếp thì tạo lại mảng bằng render
        renderTableSinhVien(arrSinhVien)
        if(order == 'asc'){
            event.target.setAttribute('data-order','desc');
        }else{
            event.target.setAttribute('data-order','asc');
        }
    }
}


