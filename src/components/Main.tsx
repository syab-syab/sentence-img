import React, { useState } from 'react'
import styled from 'styled-components'
import html2canvas from 'html2canvas'

const Wrapper = styled.div`
  background: #F0EBE3;
  padding: 5rem 40rem;
  height: 90vh;
  @media (max-width: 1100px) {
    padding: 5rem 30rem;
  }
  @media (max-width: 1000px) {
    padding: 5rem 25rem;
  }
  @media (max-width: 900px) {
    padding: 5rem 20rem;
  }
  @media (max-width: 800px) {
    padding: 5rem 15rem;
  }
  @media (max-width: 700px) {
    padding: 5rem 10rem;
  }
  @media (max-width: 600px) {
    padding: 5rem;
  }
`

const TextArea = styled.textarea`
  font-size: 2rem;
  width: 100%;
  height: 50%;
  border: 0.3rem solid black;
  border-radius: 1rem;
  resize: none;
`

const Capture = styled.section`
  font-size: 2rem;
  width: 100%;
  min-height: 50%;
  border: 0.3rem solid black;
  border-radius: 1rem;
  overflow-wrap: break-word;
  text-align: left;
  background: white;
`

const nonDisplay = "display: none;"

const btnColor = "color: black;"

const ImgCreateBtn = styled.button<{$isPreview?: boolean}>`
  ${props => props.$isPreview ? btnColor : nonDisplay};
`

const MakeImageSection = styled.section<{$isDownload?: boolean}>`
  width: 100%;
  min-height: 50%;
  border: 0.3rem solid black;
  border-radius: 1rem;
  ${props => props.$isDownload ? btnColor : nonDisplay};
`

const ImageDownloadButtonSection = styled.section<{$isDownload?: boolean}>`
  ${props => props.$isDownload ? btnColor : nonDisplay};
`

const Main = () => {
  const [sentence, setSentence] = useState<string>("")

  const [preview, setPreview] = useState<boolean>(false)

  const [imgSentence, setImgSentence] = useState<Array<string>>([])

  const [download, setDownload] = useState<boolean>(false)

  const textContent = () => {
    if (sentence.length <= 0) {
      alert("文章を入力してください。")
    } else {
      const newWords: Array<string> = sentence.includes("\n") ? sentence.split("\n") : [sentence]
      setImgSentence(newWords)
      setPreview(true)      
    }
  }

  const createScreenshot = (): void => {
    // オプションの指定
    const options = {
    // 画質を良くする
      scale: 3
    }
    const capture: any = document.getElementById("capture")
    // フォームに入力したら画像を表示
    html2canvas(capture, options).then(function(canvas) {
      //imgのsrcに、生成した画像urlを入れて表示。
      const imgData: string = canvas.toDataURL();
      const createImage: any = document.getElementById("created-image");
      // console.log(imgData)
      createImage.src = imgData;
      // 表示される画像のサイズの調整
      createImage.width = capture.clientWidth;
      // aタグのhrefに生成した画像を入れてダウンロードできるようにする
      const imageDownload: any = document.getElementById("image-download");
      imageDownload.href = imgData;
    });
    setDownload(true)
  }

  return (
    <Wrapper>
      <TextArea value={sentence} onChange={(e) => setSentence(e.target.value)} />

      <button onClick={textContent}>プレビューを表示</button>

      <button onClick={() => setSentence("")}>クリア</button>

      <Capture id='capture'>
        {
          imgSentence.map(s => {
            return <>
              {s}<br />
            </>
          })
        }
      </Capture>

      <ImgCreateBtn $isPreview={preview} onClick={createScreenshot}>画像にする</ImgCreateBtn>

      <MakeImageSection id="make-image-section" $isDownload={download}>
        <div id="image-space">
          <img src="" id="created-image" alt='created-image' />
        </div>    
      </MakeImageSection>

      <ImageDownloadButtonSection id="image-download-button-section"  $isDownload={download}>
        <a href="" id="image-download" download="screenshot">画像ダウンロード</a>
      </ImageDownloadButtonSection>
    </Wrapper>
  )
}

export default Main