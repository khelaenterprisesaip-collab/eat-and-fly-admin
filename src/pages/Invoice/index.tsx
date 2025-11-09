import ThemeButton from "components/ui/Button";
import { useNavigate } from "react-router";

const InvoiceMainPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <ThemeButton
        onClick={() => {
          navigate("/invoice/create");
        }}
      >
        Create Invoice
      </ThemeButton>
    </div>
  );
};

export default InvoiceMainPage;
