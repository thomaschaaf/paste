import * as React from 'react';
import {trackCustomEvent} from 'gatsby-plugin-google-analytics';
import {Box} from '@twilio-paste/box';
import {Text} from '@twilio-paste/text';

import {kebabCase} from 'lodash';
import {SidebarCategoryRoutes} from '../../../constants';
import {filteredComponents, alphabetizeComponents} from '../../../utils/componentFilters';
import {getNormalizedNavigationData} from '../../../utils/GraphqlUtils';
import {useNavigationContext} from '../../../context/NavigationContext';

import {SidebarAnchor} from './SidebarAnchor';
import {SidebarSeparator} from './SidebarSeparator';
import {SidebarDisclosure} from './sidebar-disclosure/SidebarDisclosure';
import {SidebarDisclosureButton} from './sidebar-disclosure/SidebarDisclosureButton';
import {SidebarDisclosureContent} from './sidebar-disclosure/SidebarDisclosureContent';

const BASE = 'sidebar-disclosure';
const NavDisclosure: React.FC<{
  children: React.ReactNode;
  categoryRoute: string;
  level: 0 | 1;
  text: string;
  onClick?: VoidFunction;
  nested?: boolean;
}> = ({children, categoryRoute, level, text, nested = false, onClick}) => {
  const buttonAttribute = `${BASE}-button-${kebabCase(text)}`;
  const contentAttribute = `${BASE}-content-${kebabCase(text)}`;
  return (
    <SidebarDisclosure nested={nested} categoryRoute={categoryRoute}>
      <SidebarDisclosureButton data-level={level} level={level} data-cy={buttonAttribute} onClick={onClick}>
        {text}
      </SidebarDisclosureButton>
      <SidebarDisclosureContent data-level={level} data-cy={contentAttribute}>
        {children}
      </SidebarDisclosureContent>
    </SidebarDisclosure>
  );
};

const SidebarNavigation: React.FC = () => {
  const data = useNavigationContext();

  const {allPasteComponent, allPasteLayout, allPastePrimitive, allPastePattern} = getNormalizedNavigationData(data);

  const allComponentSidebarItems = [...allPasteComponent, ...allPasteLayout, {name: 'Icon', slug: 'icons'}];
  const filteredComponentSidebarItems = allComponentSidebarItems.filter(filteredComponents).sort(alphabetizeComponents);

  const filteredPrimitives = allPastePrimitive.filter(filteredComponents);

  return (
    <Box
      as="nav"
      paddingTop={['space0', 'space0', 'space70']}
      paddingX="space20"
      paddingBottom={['space50', 'space50', 'space0']}
      height="100%"
      overflow="auto"
      role="navigation"
      aria-label="Main"
    >
      <Box
        display={['block', 'block', 'none']}
        marginTop="space20"
        marginLeft="space20"
        marginRight={['space160', 'space160', 'space0']}
      >
        <SidebarAnchor level={0} to="/">
          <Box display={['flex', 'flex', 'none']} alignItems="center" marginLeft="spaceNegative80" height="28px">
            <Box as="span" paddingRight="space30">
              <img src="/logo.svg" alt="" width="28px" height="28px" />
            </Box>
            <Text as="span" paddingRight="space20" fontSize={['fontSize50', 'fontSize50', 'fontSize30']}>
              Paste
            </Text>
            <Text as="span" fontSize={['fontSize50', 'fontSize50', 'fontSize30']}>
              Home
            </Text>
          </Box>
        </SidebarAnchor>
      </Box>
      <Box as="ul" padding="space0" margin="space0" listStyleType="none">
        <NavDisclosure
          level={0}
          categoryRoute={SidebarCategoryRoutes.INTRODUCTION}
          text="Introduction"
          onClick={() =>
            trackCustomEvent({
              category: 'Left Navigation',
              action: 'click-introduction',
              label: 'Introduction',
            })
          }
        >
          <SidebarAnchor level={1} to="/introduction/about-paste">
            About Paste
          </SidebarAnchor>
          <NavDisclosure level={1} text="For designers" categoryRoute={SidebarCategoryRoutes.FOR_DESIGNERS}>
            <SidebarAnchor level={2} to={`${SidebarCategoryRoutes.FOR_DESIGNERS}/design-guidelines`}>
              Design guidelines
            </SidebarAnchor>
          </NavDisclosure>
          <NavDisclosure level={1} categoryRoute={SidebarCategoryRoutes.FOR_ENGINEERS} text="For engineers">
            <SidebarAnchor level={2} to={`${SidebarCategoryRoutes.FOR_ENGINEERS}/quickstart`}>
              Quick start
            </SidebarAnchor>
            <SidebarAnchor level={2} to={`${SidebarCategoryRoutes.FOR_ENGINEERS}/manual-installation`}>
              Manual installation
            </SidebarAnchor>
          </NavDisclosure>
          <NavDisclosure level={1} text="Contributing" categoryRoute={SidebarCategoryRoutes.CONTRIBUTING}>
            <SidebarAnchor level={2} to={`${SidebarCategoryRoutes.CONTRIBUTING}/icons`}>
              Icons
            </SidebarAnchor>
            <SidebarAnchor level={2} to={`${SidebarCategoryRoutes.CONTRIBUTING}/patterns`}>
              Patterns
            </SidebarAnchor>
          </NavDisclosure>
          <SidebarAnchor level={1} to={`${SidebarCategoryRoutes.INTRODUCTION}/working-with-us`}>
            Working with us
          </SidebarAnchor>
        </NavDisclosure>

        <SidebarAnchor level={0} to="/inclusive-design">
          Accessibility
        </SidebarAnchor>
        <SidebarSeparator />
        <NavDisclosure
          level={0}
          text="Foundations"
          categoryRoute={SidebarCategoryRoutes.FOUNDATIONS}
          onClick={() =>
            trackCustomEvent({
              category: 'Left Navigation',
              action: 'click-foundations',
              label: 'Foundations',
            })
          }
        >
          <NavDisclosure
            level={1}
            nested
            text="content"
            onClick={() =>
              trackCustomEvent({
                category: 'Left Navigation',
                action: 'click-content',
                label: 'Content',
              })
            }
            categoryRoute={SidebarCategoryRoutes.CONTENT}
          >
            <SidebarAnchor level={2} to={`${SidebarCategoryRoutes.CONTENT}/content-checklist`}>
              Content checklist
            </SidebarAnchor>
            <SidebarAnchor level={2} to={`${SidebarCategoryRoutes.CONTENT}/voice-and-tone`}>
              Voice and tone
            </SidebarAnchor>
            <SidebarAnchor level={2} to={`${SidebarCategoryRoutes.CONTENT}/product-style-guide`}>
              Product style guide
            </SidebarAnchor>
          </NavDisclosure>
          <SidebarAnchor
            level={1}
            to={`${SidebarCategoryRoutes.FOUNDATIONS}/illustrations`}
            onClick={() =>
              trackCustomEvent({
                category: 'Left Navigation',
                action: 'click-illustrations',
                label: 'Illustrations',
              })
            }
          >
            Illustrations
          </SidebarAnchor>
        </NavDisclosure>

        <NavDisclosure
          categoryRoute={SidebarCategoryRoutes.PATTERNS}
          level={0}
          onClick={() =>
            trackCustomEvent({
              category: 'Left Navigation',
              action: 'click-patterns',
              label: 'Patterns',
            })
          }
          text="Patterns"
        >
          <SidebarAnchor level={1} to={SidebarCategoryRoutes.PATTERNS}>
            Overview
          </SidebarAnchor>
          {allPastePattern.map(({name, slug}: {[key: string]: string}) => (
            <SidebarAnchor level={1} to={`${SidebarCategoryRoutes.PATTERNS}/${slug}`} key={slug}>
              {name}
            </SidebarAnchor>
          ))}
        </NavDisclosure>
        <SidebarSeparator />

        <NavDisclosure
          categoryRoute={SidebarCategoryRoutes.COMPONENTS}
          level={0}
          text="Components"
          onClick={() =>
            trackCustomEvent({
              category: 'Left Navigation',
              action: 'click-components',
              label: 'Components',
            })
          }
        >
          <SidebarAnchor level={1} to={SidebarCategoryRoutes.COMPONENTS}>
            Overview
          </SidebarAnchor>
          {filteredComponentSidebarItems.map(({name, slug}: {[key: string]: string}) => {
            if (name === 'Icon') {
              return (
                <NavDisclosure
                  nested
                  level={1}
                  categoryRoute={`${SidebarCategoryRoutes.COMPONENTS}/${slug}`}
                  key={slug}
                  onClick={() =>
                    trackCustomEvent({
                      category: 'Left Navigation',
                      action: 'click-icons',
                      label: 'Icons',
                    })
                  }
                  text={name}
                >
                  <SidebarAnchor level={2} to={`${SidebarCategoryRoutes.COMPONENTS}/${slug}`}>
                    Icon list
                  </SidebarAnchor>
                  <SidebarAnchor level={2} to={`${SidebarCategoryRoutes.COMPONENTS}/${slug}/usage-guidelines`}>
                    Usage
                  </SidebarAnchor>
                </NavDisclosure>
              );
            }
            return (
              <SidebarAnchor level={1} to={`${SidebarCategoryRoutes.COMPONENTS}/${slug}`} key={slug}>
                {name}
              </SidebarAnchor>
            );
          })}
        </NavDisclosure>

        <NavDisclosure
          categoryRoute={SidebarCategoryRoutes.PRIMITIVES}
          level={0}
          text="Primitives"
          onClick={() =>
            trackCustomEvent({
              category: 'Left Navigation',
              action: 'click-primitives',
              label: 'Primitives',
            })
          }
        >
          <SidebarAnchor level={1} to={SidebarCategoryRoutes.PRIMITIVES}>
            Overview
          </SidebarAnchor>
          {filteredPrimitives.map(({name, slug}: {[key: string]: string}) => (
            <SidebarAnchor level={1} to={`${SidebarCategoryRoutes.PRIMITIVES}/${slug}`} key={slug}>
              {name}
            </SidebarAnchor>
          ))}
        </NavDisclosure>

        <NavDisclosure
          categoryRoute={SidebarCategoryRoutes.TOKENS}
          level={0}
          onClick={() =>
            trackCustomEvent({
              category: 'Left Navigation',
              action: 'click-design-tokens',
              label: 'Design Tokens',
            })
          }
          text="Tokens"
        >
          <SidebarAnchor level={1} to={`${SidebarCategoryRoutes.TOKENS}/`}>
            Token list
          </SidebarAnchor>
          <SidebarAnchor level={1} to={`${SidebarCategoryRoutes.TOKENS}/design-tokens-package`}>
            Design tokens package
          </SidebarAnchor>
        </NavDisclosure>

        <NavDisclosure
          categoryRoute={SidebarCategoryRoutes.CORE}
          level={0}
          text="Core"
          onClick={() =>
            trackCustomEvent({
              category: 'Left Navigation',
              action: 'click-core',
              label: 'Core',
            })
          }
        >
          <SidebarAnchor level={1} to={SidebarCategoryRoutes.CORE}>
            Paste core
          </SidebarAnchor>
          <SidebarAnchor level={1} to={`${SidebarCategoryRoutes.CORE}/theme-package`}>
            Theme package
          </SidebarAnchor>
          <SidebarAnchor level={1} to={`${SidebarCategoryRoutes.CORE}/changelog`}>
            Core changelog
          </SidebarAnchor>
          <SidebarAnchor level={1} to={`${SidebarCategoryRoutes.CORE}/upgrade-guide`}>
            Upgrade guide
          </SidebarAnchor>
          <NavDisclosure level={1} nested text="Libraries" categoryRoute={SidebarCategoryRoutes.LIBRARIES}>
            <SidebarAnchor level={2} to={`${SidebarCategoryRoutes.LIBRARIES}`}>
              Overview
            </SidebarAnchor>
            <SidebarAnchor level={2} to={`${SidebarCategoryRoutes.LIBRARIES}/uid-library`}>
              UID library
            </SidebarAnchor>
            <SidebarAnchor level={2} to={`${SidebarCategoryRoutes.LIBRARIES}/codemods`}>
              Codemods
            </SidebarAnchor>
          </NavDisclosure>
        </NavDisclosure>

        <NavDisclosure
          categoryRoute={SidebarCategoryRoutes.CUSTOMIZATION}
          level={0}
          text="Customization"
          data-cy="customization-button"
          onClick={() =>
            trackCustomEvent({
              category: 'Left Navigation',
              action: 'click-customization',
              label: 'Customization',
            })
          }
        >
          <SidebarAnchor level={1} to={`${SidebarCategoryRoutes.CUSTOMIZATION}/`}>
            Overview
          </SidebarAnchor>
          <SidebarAnchor level={1} to={`${SidebarCategoryRoutes.CUSTOMIZATION}/customization-provider`}>
            Customization Provider
          </SidebarAnchor>
          <SidebarAnchor level={1} to={`${SidebarCategoryRoutes.CUSTOMIZATION}/creating-a-custom-theme`}>
            Customizing themes
          </SidebarAnchor>
          <SidebarAnchor level={1} to={`${SidebarCategoryRoutes.CUSTOMIZATION}/customizing-component-elements`}>
            Customizing components
          </SidebarAnchor>
          <SidebarAnchor
            level={1}
            to={`${SidebarCategoryRoutes.CUSTOMIZATION}/composing-custom-components-with-design-tokens`}
          >
            Composing custom UI with tokens
          </SidebarAnchor>
        </NavDisclosure>
        <SidebarSeparator />
        <SidebarAnchor
          level={0}
          to="/blog"
          onClick={() =>
            trackCustomEvent({
              category: 'Left Navigation',
              action: 'click-blog',
              label: 'Blog',
            })
          }
        >
          Blog
        </SidebarAnchor>
        <SidebarAnchor
          level={0}
          to="/roadmap"
          onClick={() =>
            trackCustomEvent({
              category: 'Left Navigation',
              action: 'click-roadmap',
              label: 'Roadmap',
            })
          }
        >
          Roadmap
        </SidebarAnchor>
      </Box>
    </Box>
  );
};

export {SidebarNavigation};
