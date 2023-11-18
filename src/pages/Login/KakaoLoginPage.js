import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { memberGetMyProfile_ } from "../../api/member";

const KakaoLoginPage = () => {
  const [searchParams, _] = useSearchParams();

  const navigate = useNavigate();

  const navigateUser = async (accessToken) => {
    //프로필 생성 완료했는지, 중간 이탈했는지 여부 확인해서 navigate
    const data = await memberGetMyProfile_(accessToken);

    if (data.isProfileCreated) {
      localStorage.setItem("juptoken", accessToken); // 로컬 스토리지에 저장
      navigate("/");
      window.location.reload();
    } else {
      //토큰 임시 저장해 둔 뒤 프로필 생성 후 juptoken으로 토큰 다시 저장
      localStorage.setItem("temptoken", accessToken);
      navigate("/login-settings");
      window.location.reload();
    }
  };

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");

    console.log(accessToken);
    if (accessToken) {
      navigateUser(accessToken); //로컬스토리지 비동기 저장으로 props로 전달
    } else {
      alert("로그인에 실패하였습니다.");
      navigate("/login");
    }
  }, []);

  return <div>카카오 로그인중..</div>;
};

export default KakaoLoginPage;