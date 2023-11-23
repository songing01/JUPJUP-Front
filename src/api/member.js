import axios from "axios";
import { client, tempClient } from "./client";

const SERVER_DOMAIN = process.env.REACT_APP_SERVER_DOMAIN;

export const memberGetMyProfile = async () => {
  //자신 프로필 조회
  try {
    const res = await client.get("api/v1/members");

    return res.data.data;
  } catch (err) {
    console.log(err);
  }
};

export const memberCheckValidName = async (nickname) => {
  //닉네임 중복체크
  try {
    const res = await client.post("api/v1/members/checkNickname", {
      nickname: nickname,
    });

    return res.data.data;
  } catch (err) {
    console.log(err);
  }
};

export const memberUpdateProfile = async (nickname, gender, profileImage) => {
  //프로필 생성 및 수정
  try {
    const res = await client.put("/api/v1/members", {
      nickname: nickname,
      gender: gender,
      profileImage: profileImage,
    });

    return res.status;
  } catch (err) {
    alert("회원가입 오류");
  }
};

export const memberGeUserProfile = async (memberId) => {
  //상대 유저 프로필 조회
  try {
    const res = await client.get(`/api/v1/members/${memberId}`);

    return res.data.data;
  } catch (err) {
    console.log(err);
  }
};

//중도이탈 예외처리
export const memberGetMyProfile_ = async (accessToken) => {
  //자신 프로필 조회_ 토큰 직접 전달
  try {
    const res = await axios.get("https://api.lets-jupjup.com/api/v1/members", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return res.data.data;
  } catch (err) {
    console.log(err);
  }
};

export const memberUpdateProfile_ = async (
  nickname,
  gender,
  profileImage,
  accessToken
) => {
  return await axios.put(
    `${SERVER_DOMAIN}/api/v1/members`,
    {
      nickname: nickname,
      gender: gender,
      profileImage: profileImage,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export const memberCheckValidName_ = async (nickname, accessToken) => {
  try {
    const res = await axios.post(
      "https://api.lets-jupjup.com/api/v1/members/checkNickname",
      {
        nickname: nickname,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res.data.data;
  } catch (err) {
    console.log(err);
  }
};

//액세스 토큰 재발급
export const memberGetNewToken = async () => {
  return tempClient.post("api/v1/auth/refresh");
};
