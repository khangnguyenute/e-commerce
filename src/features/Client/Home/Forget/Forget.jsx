import { useNavigate, useParams } from "react-router-dom";
import "./password.scss";
import { useState } from "react";
import useToast from "@hooks/useToast";
import useDocumentTitle from "@hooks/useDocumentTitle";
import { useTranslation } from "react-i18next";

function Forget() {
  const { t } = useTranslation();
  const toast = useToast();

  const param = useParams("id");
  const naviage = useNavigate();

  const [password, setPassword] = useState("");
  const [rePassword, setRePassWord] = useState("");

  const [noti, setNoti] = useState("");
  const [img1, setImg1] = useState("https://frontend.tikicdn.com/_desktop-next/static/img/account/eye.png");
  const [img2, setImg2] = useState("https://frontend.tikicdn.com/_desktop-next/static/img/account/eye.png");

  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const check = (string) => {
    var regExp = /[a-zA-Z]/g;
    return regExp.test(string) && string.length >= 8;
  };
  const handleChange = async (e) => {
    e.preventDefault();
    if (password === "" && rePassword === "") {
      setNoti("Vui lòng nhập thông tin");
      setInput1("has-error");
      setInput2("has-error");
    } else if (!check(password)) {
      setNoti("Mật khẩu không đúng định dạng");
      setInput1("has-error");
    } else if (password !== rePassword) {
      setNoti("Mật khẩu chưa trùng khớp");
      setInput2("has-error");
    } else {
      toast.success("Thiết lập mật khẩu thành công!");
      const data = {
        id: param.id,
        password: password,
      };
      // await editForgetPassword(data);
      naviage("/");
    }
  };
  const handleImg1 = () => {
    if (img1 === "https://frontend.tikicdn.com/_desktop-next/static/img/account/eye.png") {
      setImg1("https://frontend.tikicdn.com/_desktop-next/static/img/account/eye-splash.png");
      document.getElementById("1").type = "text";
    } else {
      setImg1("https://frontend.tikicdn.com/_desktop-next/static/img/account/eye.png");
      document.getElementById("1").type = "password";
    }
  };
  const handleImg2 = () => {
    if (img2 === "https://frontend.tikicdn.com/_desktop-next/static/img/account/eye.png") {
      setImg2("https://frontend.tikicdn.com/_desktop-next/static/img/account/eye-splash.png");
      document.getElementById("2").type = "text";
    } else {
      setImg2("https://frontend.tikicdn.com/_desktop-next/static/img/account/eye.png");
      document.getElementById("2").type = "password";
    }
  };

  useDocumentTitle(t("forgetPassword"));

  return (
    <div className="mb-[2rem]">
      <center className="mb-6 mt-4 text-2xl font-semibold">Thiết lập mật khẩu</center>
      <div className="innerPassword">
        <div className="item">
          <form className="form" onSubmit={(e) => handleChange(e)}>
            <div className="form-control">
              <label className="input-label">Mật khẩu mới</label>
              <div className="styles__StyledInput-sc-s5c7xj-5 hisWEc">
                <input
                  name="password"
                  id="1"
                  maxlength="32"
                  placeholder="Nhập mật khẩu mới"
                  type="password"
                  className={`input with-icon-right ${input1} `}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  onClick={(e) => setInput1("")}
                />
                <img src={img1} alt="" onClick={() => handleImg1()} className="icon-right" />
              </div>
              <div className="hint-message"> Mật khẩu phải dài từ 8 đến 32 ký tự, bao gồm chữ và số</div>
            </div>
            <div className="form-control">
              <label className="input-label">Nhập lại mật khẩu mới</label>
              <div className="styles__StyledInput-sc-s5c7xj-5 hisWEc">
                <input
                  name="confirmPassword"
                  id="2"
                  maxlength="32"
                  placeholder="Nhập lại mật khẩu mới"
                  type="password"
                  className={`input with-icon-right ${input2} `}
                  onChange={(e) => setRePassWord(e.target.value)}
                  value={rePassword}
                  onClick={(e) => setInput2("")}
                />
                <img src={img2} alt="" onClick={() => handleImg2()} className="icon-right" />
              </div>
              <label className=" mt-4 text-[red]">{noti}</label>
            </div>

            <button type="submit" disabled="" className="styles__StyledBtnSubmit-sc-s5c7xj-3 cqEaiM">
              Lưu thay đổi
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Forget;
