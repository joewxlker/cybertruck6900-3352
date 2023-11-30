import { type FC } from "react"
import { SectionWrapper } from "../components/sectionWrapper"
import { Section } from "../components/section"

import data from 'public/tokenomics.json';
import uuid4 from "uuid4";

export const Tokenomics: FC<{ layout: string }> = ({ layout }) => {
    return (
        <SectionWrapper layout={layout}>
        <Section.Container id="tokenomics">
          <Section.Header title="tokenomics"/>
          <Section.Body>
            <Section.Graphics alt="" height={400} src="/trucks-900x400.png" width={900} opaque/>
            <div className="flex-1 gap-5 flex flex-col">
              <div className="flex flex-row xl:justify-between lg:justify-between xl:flex-nowrap lg:flex-nowrap flex-wrap justify-center">
                {data.tokenData.map(props => <TokenData key={uuid4()} {...props}/>)}
              </div>
              {data.distribution.map(props => <DistributionItem key={uuid4()} {...props} />)}
            </div>
          </Section.Body>
        </Section.Container>
      </SectionWrapper>
    )
}

const TokenData: FC<{ title: string; body: string; }> = ({ title, body }) => {
    return (
        <span className="text-center p-2">
        <h4 className="xl:text-2xl lg:text-2xl text-xl font-heading text-t1">{title}</h4>
        <p className='text-t1 xl:text-xl lg:text-xl text-lg font-body'>{body}</p>
        </span>
    );
}
  
const DistributionItem:FC<{ title: string; children: { title: string; body: string; amount: string; }[];}> = ({ children, title }) => {
    return (
        <div className="flex flex-col">
            <h4 className="text-2xl font-heading text-t1">{title}</h4>
            <div className="flex flex-row flex-wrap gap-5 p-2 border-t1 border-[1px] border-opacity-30">
            {children.map(childProps => <DistributionData key={uuid4()} parentTitle={title} {...childProps} />)}
            </div>
        </div>
    );
}
  
function DistributionData({ amount, parentTitle, title }: { title: string; body: string; amount: string; parentTitle: string }) {
    return (
        <div style={{ flex: amount }} className="bg-white bg-opacity-10 xl:p-3 lg:p-3 p-2 hover:bg-opacity-20 transition-opacity duration-300">
            <h5 className='text-t1 xl:text-xl lg:text-xl text-lg font-body'>{title}</h5>
            <p className='text-t1 xl:text-xl lg:text-xl text-lg font-body'>{parentTitle === 'Taxes' ? parseFloat(amount) * 10 : parseFloat(amount) * 100}%</p>
        </div>
    );
}