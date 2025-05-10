import { Sun, CloudDrizzle, Cloudy } from "lucide-react"
import { Button } from "./components/ui/button"

function App() {
  document.body.classList.add("bg-stone-300")
  return (
    <>
      <div className="w-full flex justify-end-safe bg-stone-600 p-2 md:mb-7 mb-2">
        <a href="/newsletter">
          <div className="bg-stone-300 rounded text-black p-2">
            My Newsletter
          </div>

        </a>
      </div>
      <div className="w-full h-full flex bg-stone-300 justify-center">
        <div className="w-3/6 border-2 border-dashed border-black rounded-3xl justify-center p-2">
          <div className="text-3xl text-black text-center font-bold mb-3">
            Create your own customizable Newsletter
          </div>
          <div className="mb-2 rounded-2xl border-stone-500 text-center text-stone-950 p-3 border-2 w-full text-xl">
            Choose your own elements, modify them
          </div>
          <div className="mb-2 rounded-2xl border-stone-500 text-center text-stone-950 p-3 border-2 w-full text-xl">
            Weather for Tallinn
            <div className="flex justify-between">
              <div>
              <span className="font-semibold">07.05</span>
              <Sun size={48} color="#706700" />
              <div>
                <span>7°</span>
                <span className="text-sm">2°</span>
              </div>
              </div>
              <div>
              <span className="font-semibold">08.05</span>
              <Cloudy size={48} color="#706700" />
              <div>
                <span>10°</span>
                <span className="text-sm">3°</span>
              </div>
              </div>
              <div>
              <span className="font-semibold">09.05</span>
              <Sun size={48} color="#706700" />
              <div>
                <span>11°</span>
                <span className="text-sm">0°</span>
              </div>
              </div>
              <div>
                <span className="font-semibold">10.05</span>
                <CloudDrizzle size={48} color="#706700" />
                <div>
                <span>3°</span>
                <span className="text-sm">2°</span>
              </div>
              </div>
            </div>
          </div>
          <div className="mb-2 rounded-2xl border-stone-500 text-center text-stone-950 p-3 border-2 w-full text-xl">
            RSS summary of chosen blogs 
          </div>
          <div className="mb-2 rounded-2xl border-stone-500 text-center text-stone-950 p-3 border-2 w-full text-xl">
            <Button className="w-full bg-stone-600">Sign up!</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
