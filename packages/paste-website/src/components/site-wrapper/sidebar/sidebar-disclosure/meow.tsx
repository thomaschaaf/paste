import {trackCustomEvent} from 'gatsby-plugin-google-analytics';

import {SidebarCategoryRoutes} from '../../../constants';

const meow = [
  {
    categoryRoute: SidebarCategoryRoutes.INTRODUCTION,
    button: {
      title: 'Introduction',
      level: 0,
      onClick: trackCustomEvent({
        category: 'Left Navigation',
        action: 'click-introduction',
        label: 'Introduction',
      }),
    },
    content: {
      anchors: [],
      disclosures: [],
    },
  },
];

const BASE = 'sidebar-disclosure';
const Woof = ({children, categoryRoute, level, text, onClick}) => {
  const buttonAttribute = `${BASE}-button-${kebabCase(title)}`;
  const contentAttribute = `${BASE}-content-${kebabCase(title)}`;
  return (
    <SidebarDisclosure categoryRoute={categoryRoute}>
      <SidebarDisclosureButton level={level} data-cy={buttonAttribute} onClick={onClick}>
        {text}
      </SidebarDisclosureButton>
      <SidebarDisclosureContent data-cy={contentAttribute}>{children}</SidebarDisclosureContent>
    </SidebarDisclosure>
  );
};
