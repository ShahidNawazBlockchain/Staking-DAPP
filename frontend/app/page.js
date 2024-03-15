import Wallet from "@/components/wallet/Wallet";
import Navigation from "@/components/Navigation/Navigation";
import DisplayPannel from "@/components/displayPannel/DisplayPannel";
export default function Home() {
  return (
    <div>
    <Wallet>
    <Navigation/>
    <DisplayPannel/>
    </Wallet>
    </div>
  );
}
