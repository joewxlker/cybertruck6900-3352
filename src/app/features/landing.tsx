import { type FC } from "react"
import { Button } from "../components/button"

export const Landing: FC<{ layout: string }> = ({ layout }) => {
    return (
        <div className={`relative w-screen`}>
        <div className={`${layout} max-w-[2000px] flex flex-col h-screen gap-5 xl:justify-center lg:justify-center justify-evenly items-start m-auto`}>
          <h1 className="font-heading xl:text-9xl lg:text-9xl text-5xl text-t1 xl:text-left lg:text-left text-center">WELCOME TO $CYBERTRUCK</h1>
          <p className="font-body xl:text-2xl lg:text-2xl text-xl text-t2 xl:text-left lg:text-left text-center xl:w-1/2 lg:w-1/w">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique</p>
          <div className="flex flex-row gap-5 items-center xl:justify-start lg:justify-start justify-center  w-full">
            <Button href="" text="JOIN US" size='big' />
            <Button href="" text="GIVE AWAY" size='big' />
            <Button href="" text="BUY"size='big' />
          </div>
          <div id="landing" className="-z-10 inset-0 absolute">
            <div className="h-full w-full"/>
          </div>
        </div>
      </div>
    )
}