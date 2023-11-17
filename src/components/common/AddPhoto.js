import React, { useRef, useState } from "react";
import styled from "@emotion/styled";
import add from "../../assets/common/add.png";
const AddPhoto = ({ setImgFile, imgFile }) => {
  //issue: overflow: scroll 안됨 해야함
  //사진 첨부취소 작업
  const imgRef = useRef();
  const [previewImgs, setPreviewImgs] = useState([]); //미리보기 파일

  //사진 미리보기
  const handlePreviewImgs = (files) => {
    console.log(files);
    setPreviewImgs([]); //초기화

    for (var i = 0; i < files.length; i++) {
      //입력된 이미지 개수 만큼 반복하여 프리뷰 이미지 생성
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onloadend = async (e) => {
        setPreviewImgs((previewImgs) => [...previewImgs, e.target.result]);
      };
    }
  };

  //사진 첨부
  const uploadImg = () => {
    const maxFileLength = 5; //이미지 최대 장수

    let newFiles = [...imgRef.current.files]; //다중 이미지 입력 받기

    let files = [...imgFile]; //기존에 입력 받았던 이미지들
    files = files.concat(newFiles); //새로 입력 받은 이미지 추가

    if (files.length > maxFileLength) {
      alert(`이미지는 최대 ${maxFileLength}장 첨부 가능합니다.`);
      files = files.slice(0, 5); //5장만 남기기
    }

    setImgFile(files); //이미지 파일 원본 저장 (최대 5장)

    handlePreviewImgs(files);
  };
  //사진 첨부 취소
  const deleteImg = () => {
    // 이미지 한장씩 첨부 취소
    //아래는 전체취소
    // imgRef.current.value = "";
    // setPreviewImgs([]);
    // setImgFile();
  };

  return (
    <Photo>
      <input
        className="input"
        accept=".jpg, .jpeg, .png"
        type="file"
        id="file-input"
        multiple
        onChange={uploadImg}
        ref={imgRef}
      />
      <label htmlFor="file-input">
        <div className="subjects">
          <img className="add-icon" src={add} alt="" />
          사진 추가하기
        </div>
      </label>
      <PreviewContainer>
        {previewImgs.length ? (
          previewImgs.map((el, index) => {
            return (
              <div className="preview" key={index}>
                <img className="preview-image" src={el} alt="" />
              </div>
            );
          })
        ) : (
          <div className="preview"></div>
        )}
      </PreviewContainer>
    </Photo>
  );
};

export default AddPhoto;
const Photo = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: end;
  .input {
    display: none;
  }
  .subjects {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    font-size: 12px;
    font-weight: 600;
    line-height: 18px; /* 150% */
  }
  .add-icon {
    width: 12px;
    height: 12px;
    margin-right: 3px;
  }
`;
const PreviewContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  gap: 10px;
  overflow-x: scroll;
  width: 100%;

  .preview {
    display: flex;
    width: 80px;
    height: 80px;
    flex-shrink: 0;
    border-radius: 8px;
    .preview-image {
      width: 100%;
      height: 100%;
      border-radius: 8px;
    }
  }
`;
