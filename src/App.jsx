import { ethers } from "ethers"
import { useState } from "react"


function App() {
  const [ account, setAccount ] = useState(null);
  const [ signer, setSigner ] = useState(null);
  const [ text, setText ] = useState("Connect wallet");
  const [hash, setHash] = useState(null);
  const [ formData, setFormData ] = useState({
    address : "",
    value : ""
  });

  const handleOnChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  const connectWallet = async () => {
    setText("Loading")
    if(window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      console.log(signer);
      console.log(provider);
      setSigner(signer);
      setAccount(signer.address);
    }else{
      alert("Please install a crypto wallet")
    }
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    console.log(formData)
    const tx = await signer.sendTransaction({
      to: formData.address,
      value: ethers.parseUnits(formData.value, 'ether'),
    });
    console.log(tx);
    setHash(tx.hash)
  }

  return (
    <div className="h-screen flex flex-col gap-6 items-center justify-center">
      <h1 className="text-xl text-red-600">EthPay</h1>

      {
        account && 
        <h1>
          {account}
        </h1>
      }

      {
        !account &&  <button className="bg-gray-300 px-4 py-1 rounded-lg" onClick={connectWallet}>{text}</button>
      }

      {
        account && 
        <form onSubmit={handleOnSubmit} className="flex flex-col gap-5">
          <input className="border-2 border-black py-1 px-3 w-[400px] rounded" type="text" placeholder="enter address" name="address" value={formData.address} onChange={handleOnChange}/>
          <input className="border-2 border-black py-1 px-3 w-[400px] rounded" type="text" placeholder="enter value" name="value" value={formData.value} onChange={handleOnChange}/>
          <button className="bg-gray-300 px-4 py-1 rounded-lg">Transfer</button>
        </form>
      }
      {
        hash && <p>Hash: {hash}</p>
      }
    </div>
  )
}

export default App
