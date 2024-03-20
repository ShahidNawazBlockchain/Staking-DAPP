import Wallet from "@/components/wallet/Wallet";
import Navigation from "@/components/Navigation/Navigation";
import DisplayPannel from "@/components/displayPannel/DisplayPannel";
import TokenApproval from "@/components/StakeToken/TokenApproval";
import StackedAmount from "@/components/StakeToken/StakeAmount";
import Withdraw from "@/components/withdraw/Withdraw";
export default function Home() {
  return (
    <div  className="container">
    <Wallet>
    <Navigation/>
    <DisplayPannel/>
    <TokenApproval/>
    <StackedAmount/>
    <Withdraw/>
    </Wallet>
    </div>
  );
}
