$(document).ready(function () {
    var nguoiDungService = new NguoiDungService();

    function showPhim() {
        console.log('tram anh');
        console.log('vang anh');
        console.log('maria');
    }

    layDanhSachNguoiDung();

    //function cho #myModal khi bấm thêm mới hoặc cập nhật
    function getInput(title, btn, idbtn ) {
        $('.modal-title').html(title);
        var footer = `
            <button class='btn btn-success' id='${idbtn}'>${btn}</button>
            <button type='button' class='btn btn-danger' data-dismiss='modal'>Đóng</button>
            `;
        $('.modal-footer').html(footer);
    }

    //button thêm mới
    $('#btnThemNguoiDung').click(function(){
        
        getInput('Thêm mới người dùng', 'Thêm mới', 'btnThem');

        //trả lại về nội dung cũ cho các thẻ label
        $('#TaiKhoan').prev().html('Tài khoản');
        $('#HoTen').prev().html('Họ tên');
        $('#MatKhau').prev().html('Mật khẩu');
        $('#Email').prev().html('Email');
        $('#SoDienThoai').prev().html('Số điện thoại');
        $('#loaiNguoiDung').prev().html('Loại người dùng');

        //Làm rỗng các ô input
        $('#TaiKhoan').val('');
        $('#TaiKhoan').removeAttr('disabled');
        $('#HoTen').val('');
        $('#MatKhau').val('');
        $('#Email').val('');
        $('#SoDienThoai').val('');
    })

    //button thêm mới (in modal)
    $('body').delegate('#btnThem','click', function(){
        var txtTK = $('#TaiKhoan').val();
        var txtMk = $('#MatKhau').val();
        var txtHoTen = $('#HoTen').val();
        var txtEmail = $('#Email').val();
        var txtSoDT = $('#SoDienThoai').val();
        var txtMa = $('#loaiNguoiDung').val();
        
        //Lấy nội dung html thẻ option
        var txtLoai = $(`[value=${txtMa}]`).text();

        var newND = new NguoiDung(txtTK, txtHoTen, txtMk, txtEmail, txtSoDT, txtMa);
        nguoiDungService.themNguoiDung(newND);
        
        //Thuộc tính TenLoaiNguoiDung có sẵn trên database, mặc dù không khai báo trong NguoiDungService nhưng vẫn gọi được
        newND.TenLoaiNguoiDung = txtLoai;
        
        //Thêm vào bảng
        nguoiDungService.DSND.push(newND);
        
        //update bảng ngay lập tức
        taoBang(nguoiDungService.DSND);

        //Đóng modal
        $('.close').trigger('click');
    })

    //button Sửa
    $('body').delegate('.btnSua', 'click', function(){
        getInput('Cập nhật người dùng', 'Cập nhật', 'btnCapNhat');
        var tk = $(this).data('capnhat');

        // var index = getIndexNguoiDung(nguoiDungService.DSND, tk);
        // var index = nguoiDungService.layViTriNguoiDung(tk);
        
        var nguoiDung = nguoiDungService.layThongTinNguoiDung(tk);
        console.log(nguoiDung);


        //Show nội dung cũ
        $('#TaiKhoan').val(nguoiDung.TaiKhoan);
        $('#TaiKhoan').prev().html('Tài khoản (không được thay đổi)');
        $('#TaiKhoan').attr('disabled', 'true');
        $('#HoTen').val(nguoiDung.HoTen);
        $('#HoTen').prev().html('Nhập họ tên mới (nếu có)');
        $('#MatKhau').val(nguoiDung.MatKhau);
        $('#MatKhau').prev().html('Nhập mật khẩu mới (nếu có)');
        $('#Email').val(nguoiDung.Email);
        $('#Email').prev().html('Nhập email mới (nếu có)');
        $('#SoDienThoai').val(nguoiDung.SoDT);
        $('#SoDienThoai').prev().html('Nhập số điện thoại mới (nếu có)');
        $('#loaiNguoiDung').val(nguoiDung.MaLoaiNguoiDung);
        $('#loaiNguoiDung').prev().html('Chọn loại người dùng mới (nếu có)');
    });
    
    //button cập nhật (in modal)
    $('body').delegate('#btnCapNhat', 'click', function() {
        //lấy nội dung mới trong các ô input
        var txtTK = $('#TaiKhoan').val();  //ô này nội dung cũ do bị disabled
        var txtHoTen = $('#HoTen').val();
        var txtMk = $('#MatKhau').val();
        var txtEmail = $('#Email').val();
        var txtSoDT = $('#SoDienThoai').val();
        var txtMa = $('#loaiNguoiDung').val();
        
        //Lấy nội dung html thẻ option
        var txtLoai = $(`[value=${txtMa}]`).text();
        console.log(txtLoai);

        //Cập nhật bảng ngay lập tức, ko cần load trang
        var index = nguoiDungService.getIndexNguoiDung(txtTK);
        
        nguoiDungService.DSND[index].HoTen = txtHoTen;
        nguoiDungService.DSND[index].MatKhau = txtMk;
        nguoiDungService.DSND[index].Email = txtEmail;
        nguoiDungService.DSND[index].SoDT = txtSoDT;
        nguoiDungService.DSND[index].MaLoaiNguoiDung = txtMa;
        //Thuộc tính TenLoaiNguoiDung có sẵn trên database, mặc dù không khai báo trong NguoiDungService nhưng vẫn gọi được
        nguoiDungService.DSND[index].TenLoaiNguoiDung = txtLoai;
        
        // Update bảng mới
        taoBang(nguoiDungService.DSND);

        //Cập nhật lên database
        var update = JSON.stringify(newND);
        nguoiDungService.capNhatNguoiDung(update);

        //Đóng modal
        $('.close').click();
    })

    //button xóa
    $('body').delegate('.btnXoa', 'click', function() {
        var tk = $(this).data('xoa');
        nguoiDungService.xoaNguoiDung(tk);
    })

    //input tìm kiếm
    $('#inputTimKiem').keyup(function(){
        var mangTimKiem = [];
        var tk = $(this).val();
        mangTimKiem = nguoiDungService.timKiemNguoiDung(tk);
        taoBang(mangTimKiem);
    })

    //Lấy từ database
    function layDanhSachNguoiDung() {
        nguoiDungService.layDanhSachNguoiDung()
            .done(function (result1) {
                nguoiDungService.DSND = result1;
                localStorage.setItem("danhSachNguoiDung", JSON.stringify(nguoiDungService.DSND));
                taoBang(nguoiDungService.DSND);
            })
            .fail(function (error) {
                console.log(error);
            });
    }

    // CÁCH 2: TẠO BẢNG TRONG HÀM MAIN
    function taoBang(danhSach) {
        var content = '';
        danhSach.map(function (item, index) {
            content +=
                `<tr>
                <td>${index + 1}</td>
                <td>${item.TaiKhoan}</td>
                <td>${item.MatKhau}</td>
                <td>${item.HoTen}</td>
                <td>${item.Email}</td>
                <td>${item.SoDT}</td>
                <td>${item.TenLoaiNguoiDung}</td>
                <td>
                    <button class='btn btn-success btnSua' data-capnhat='${item.TaiKhoan}' data-toggle='modal' data-target='#myModal'>Sửa</button>
                    <button class='btn btn-danger btnXoa' data-xoa='${item.TaiKhoan}'>Xóa</button>
                </td>
            </tr>`;
        });
        $('#tblDanhSachNguoiDung').html(content);
    }

    //Lấy vị trí người dùng khi bấm xóa hoặc cập nhật
        // function getIndexNguoiDung (danhsach, tk) {
        //     for (var i = 0; i < danhsach.length; i++) {
        //         if (danhsach[i].TaiKhoan === tk.toString()) {
        //             return i;
        //         }
        //     }
        //     return -1;
        // }

    
})
