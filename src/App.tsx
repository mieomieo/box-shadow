import "./App.css";
import BoxShadowGenerator from "./components/BoxShadowGenerator";
import Preview from "./components/Preview";
import PreviewCode from "./components/PreviewCode";
import Header from "./components/layout/Header";
import Template from "./components/template/Template";

function App() {
  return (
    <>
      <Header />
      <div className="grid  sm:grid-cols-1  md:grid-cols-1 lg:grid-cols-2 gap-4  m-auto sm:w-5/6 md:w-5/6 lg:w-4/5 xl:3/5 ">
        <BoxShadowGenerator />
        <div>
          <Preview />
          <PreviewCode />
          <Template />
        </div>
      </div>
    </>
  );
}

export default App;
