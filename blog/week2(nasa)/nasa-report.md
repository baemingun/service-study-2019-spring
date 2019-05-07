# NASA에서 오늘의 우주 사진 가져오기

## 2017320124 송동욱

<https://velopert.com/3503>를 참고하여 작성한 코드에 React Hook, styled-component을 적용합니다.



### 작업환경 설정

create react app으로 프로젝트를 생성합니다.

<code>create-react-app nasa-apod</code>



필요한 모듈들을 설치합니다.

<code>yarn add axios classnames sass-loader node-sass include-media open-color better-react-spinkit react-icons moment styled-components</code>



### 프로젝트 초기화

불필요한 파일들을 제거합니다.

- src/App.js
- src/App.test.js
- src/logo.svg
- src/index.css



App 컴포넌트의 내부를 비워 줍니다. create-react-app에서 App component가 함수형 컴포넌트로 변경되었습니다.

<code>src/App.js</code>

```javascript
import React from "react";
import styled, { injectGlobal } from "styled-components";

function App() {
  return <div>App</div>;
}

export default App;

```



index.js에서 index.css를 불러오는 코드를 지워줍니다.

<code>src/index.js</code>

```javascript
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));
serviceWorker.unregister();

```



### Global Style 설정하기

Styled-Components에는 Global하게 style을 다룰 수 있는 특별한 StyledComponent가 존재합니다. 일반적으로 styled component는 local scope를 가집니다. <code>createGlobalStyle</code>을 사용하여 global scope를 가지도록 설정할 수 있습니다. 마치 CSS resets 혹은 base stylesheets를 적용하는데 사용할 수 있습니다. StyledComponent를 생성하여 React tree의 최상단에 배치하여 global style을 적용할 수 있습니다. 이 컴포넌트는 children이 없습니다.

App Component에서 GlobalStyle이라는 컴포넌트를 하나 생성하여 추가해 주겠습니다.

<code>src/App.js</code>

```javascript
import React from "react";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body{
    margin: 0;
    background-color: #7f8c8d;
    box-sizing: border-box;
  }
  *{
    box-sizing : *;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <div>App</div>
    </>
  );
}

export default App;
```



### 컴포넌트 틀 준비하기

세 가지의 컴포넌트를 만듭니다. 그리고 styled component를 적용하여 컴포넌트를 스타일링합니다. 각 컴포넌트마다 디렉토리를 하나씩 만들어 줄 것이고, 각 디렉토리에 2종류의 파일을 만듭니다.

1. ComponentName.js
2. index.js

index.js는 컴포넌트를 불러와서 바로 내보내주는 파일입니다. 우리가 컴포넌트를 불러오게 될 때 <br/><code>src/components/ComponentName/ComponentName</code>이 아닌 <code>src/components/ComponentsName</code> 형식으로 불러올 수 있도록 해 줍니다.

```javascript
export { default } from './ComponentName';
```



#### Viewer Template

이 컴포넌트는 템플릿 컴포넌트로, JSX형태의 props인 viewer, spaceNavigator를 받아와서 적당한 위치에 렌더링합니다. 

다음 파일들을 생성하세요.

- src/components/ViewerTemplate/ViewerTemplate.js
- src/components/ViewerTemplate/index.js

#### <code>src/components/ViewerTemplate/ViewerTemplate.js</code>

```javascript
import React from "react";
import styled from "styled-components";

const ViewerTemplate = ({ viewer, spaceNavigator }) => {
  return <div className="viewer-template" />;
};

export default ViewerTemplate;
```

#### <code>src/components/ViewerTemplate/index.js</code>

```javascript
export { default } from "./ViewerTemplate";
```



#### Viewer

이 컴포넌트는 이미지 혹은 동영상을 보여주는 컴포넌트로, 데이터의 형식은 mediaType에 "video" 혹은 "image"라는 값으로 전달이 됩니다. 이에 따라 url을 사용하여 동영상이나 이미지를 보여줍니다. 추가적으로 loading값은 데이터를 불러올 때 로딩 표시를 하기 위하여 사용되는 props입니다.

- src/components/Viewer/Viewer.js
- src/components/Viewer/index.js

#### <code>src/components/Viewer/Viewer.js</code>

```javascript
import React from "react";
import styled from "styled-components";

const Viewer = ({ mediaType, url, loading }) => {
  return <div className="viewer" />;
};

export default Viewer;
```

#### <code>src/components/Viewer/index.js</code>

```javascript
export { default } from "./Viewer";
```



#### SpaceNavigator

이 컴포넌트는 앞, 뒤로 넘기는 버튼을 내장합니다. 각 버튼에 연결될 함수 onPrev와 onNext를 props로 받습니다.

- src/components/SpaceNavigator/SpaceNavigator.js
- src/components/SpaceNavigator/index.js

#### <code>src/components/SpaceNavigator/SpaceNavigator.js</code>

```javascript
import React from "react";
import styled from "styled-components";

const SpaceNavigator = ({ onPrev, onNext }) => {
  return <div className="space-navigator" />;
};

export default SpaceNavigator;
```

#### <code>src/components/SpaceNavigator/index.js</code>

```javascript
export { default } from "./SpaceNavigator";
```



### ViewerTemplate 컴포넌트 완성하기

ViewerTemplate컴포넌트에 styled component를 추가하고, 안의 내용을 추가합니다.

#### <code>src/components/ViewerTemplate/ViewerTemplate.js</code>

```javascript
import React from "react";
import styled from "styled-components";

const Header = styled.header`
  background: #2c3e50;
  height: 5rem;
  color: white;
  padding: 1rem;

  display: flex;
  align-items: center;

  font-size: 2rem;
  font-weight: 600;
  @include media("<tablet") {
    font-size: 1.25rem;
  }
`;
const ViewerWrapper = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 5rem);
`;

const ViewerTemplate = ({ viewer, spaceNavigator }) => {
  return (
    <div className="viewer-template">
      <Header>Astromy Picture of the Day</Header>
      <ViewerWrapper className="viewer-wrapper">
        {viewer}
        <div className="space-navigator-wrapper">{spaceNavigator}</div>
      </ViewerWrapper>
    </div>
  );
};

export default ViewerTemplate;
```



이 컴포넌트를 App에서 불러옵니다.

#### <code>src/App.js</code>

```javascript
import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import ViewerTemplate from "./components/ViewerTemplate";
const GlobalStyle = createGlobalStyle`
  body{
    margin: 0;
    background-color: #7f8c8d;
    box-sizing: border-box;
  }
  *{
    box-sizing : *;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <ViewerTemplate />
    </>
  );
}

export default App;
```



그럼 다음과 같은 모양이 완성됩니다.

![image-20190504204559448](/Users/quino0627/Library/Application Support/typora-user-images/image-20190504204559448.png)

### Viewer 컴포넌트 완성하기

우리가 나중에 호출할 NASA Open API는 두가지 형태의 데이터를 반환합니다.

```javascript
{
  "media_type" : "video",
  "url" : "https://www.youtube.com/embed/uj3Lq7Gu94Y?rel=0"
}
```

유튜브 비디오를 반환할 때도 있고

```javascript
{
  "media_type" : "image",
  "url": "https://apod.nasa.gov/apod/image/1712/GeminidsYinHao1024.jpg"
}
```

이미지를 반환할 때도 있습니다. View 컴포넌트에서는 각 상황에 따라 알맞는 뷰를 보여주도록 설정하겠습니다.

우선, Viewer 컴포넌트를 작성하기 전에 먼저 App에서 불러와서 이밎 형태의 데이터를 주입해 보겠습니다.

#### <code>src/App.js</code>

```javascript
import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import ViewerTemplate from "./components/ViewerTemplate";
import SpaceNavigator from "./components/SpaceNavigator";
import Viewer from "./components/Viewer";
const GlobalStyle = createGlobalStyle`
  body{
    margin: 0;
    background-color: #7f8c8d;
    box-sizing: border-box;
  }
  *{
    box-sizing : *;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <ViewerTemplate
        viewer={
          <Viewer
            url="https://apod.nasa.gov/apod/image/1712/GeminidsYinHao1024.jpg"
            mediaType="image"
          />
        }
        spaceNavigator={<SpaceNavigator />}
      />
    </>
  );
}

export default App;
```

이렇게 props를 직접 주입해 주었습니다. 이제 Viewer 컴포넌트에서 이에 따라 렌더링을 해봅시다.



#### <code>src/components/Viewer/Viewer.js</code>

