import { type FC } from "react";
import { SectionWrapper } from "../components/sectionWrapper";
import { Section } from "../components/section";

export const About: FC<{layout: string}> = ({ layout }) => {
    return (
      <SectionWrapper layout={layout}>
        <Section.Container id="about">
          <Section.Header title="about"/>
          <Section.Body>
            <div className="border-l-t1 border-l-[1px] pl-5">
              <Section.Article body="At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique" />
            </div>
            <Section.Graphics opaque alt="" height={400} src="/truck-900x400.png" width={900} />
          </Section.Body>
        </Section.Container>
      </SectionWrapper>
    )
}