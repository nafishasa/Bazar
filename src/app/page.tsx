import Banner from "@/components/banner/Banner";
import All from "@/components/body/All";
import Down from "@/components/body/Down";
import Up from "@/components/body/Up";



export default function Home() {
  return (
    <div >
    <Banner/>
    <Up/>
    <Down/>
    <All/>
    </div>
  );
}
