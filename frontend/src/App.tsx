import Button from "./components/ui/Button";
import Loader from "./components/ui/Loader";
import Form from "./components/widgets/Form";

const App = () => {
  return (
    <div className="flex justify-center items-center flex-col gap-50">
      <div className="py-5">
        <Button />
        <Loader />
        <Form />
      </div>
    </div>
  );
};

export default App;