import * as React from 'react';
import {matchers} from 'jest-emotion';
import {render, screen} from '@testing-library/react';
// @ts-ignore typescript doesn't like js imports
import axe from '../../../../../.jest/axe-helper';
import {
  AlertDialogWithTwoActions,
  DestructiveAlertDialog,
  CustomizedAlertDialog,
  CustomizedDestructiveAlertDialog,
} from '../stories/index.stories';

expect.extend(matchers);

describe('Alert Dialog', () => {
  it('Should render an alert dialog box', () => {
    render(<AlertDialogWithTwoActions />);
    expect(screen.getByText('Submit application')).toBeDefined();
  });

  it('Should have two, labeled buttons when a secondary label and action is given', () => {
    render(<AlertDialogWithTwoActions />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
    expect(buttons[0]).toHaveTextContent('Cancel');
    expect(buttons[1]).toHaveTextContent('Submit');
  });

  it('Should have a destructive button style when the destructive prop is included', () => {
    render(<DestructiveAlertDialog />);
    expect(screen.getByText('Delete')).toHaveStyle('background-color: color-background-destructive');
  });

  it('Should have a heading the same as the heading prop', () => {
    render(<AlertDialogWithTwoActions />);
    expect(screen.getByRole('heading')).toHaveTextContent('Submit application');
  });

  it('Should have the correct aria attributes', () => {
    render(<AlertDialogWithTwoActions />);
    expect(screen.getByRole('alertdialog')).toBeTruthy();
    expect(screen.getByRole('alertdialog').getAttribute('aria-modal')).toEqual('true');
    expect(screen.getByRole('alertdialog').getAttribute('aria-labelledby')).toEqual(
      screen.getByRole('heading').getAttribute('id')
    );
    expect(screen.getByRole('alertdialog').getAttribute('aria-describedby')).toEqual(
      screen
        .getByText('Are you sure you want to submit this application? No information can be changed after submitting.')
        .getAttribute('id')
    );
  });

  it('Should have the initial focus land on the first focusable item', () => {
    render(<AlertDialogWithTwoActions />);
    expect(document.activeElement).toEqual(screen.getAllByRole('button')[0]);
  });
});

describe.only('Alert Dialog `element` prop', () => {
  it.only('should set the default element prop on Alert Dialog', () => {
    const {container} = render(<CustomizedAlertDialog />, {
      wrapper: ({children}) => <div id="test-container-wrapper">{children}</div>,
    });

    console.log(screen.debug());
    expect(screen.getByTestId('alert_dialog').getAttribute('data-paste-element')).toEqual('ALERT_DIALOG');
    // expect(container.querySelector('[data-paste-element="ALERT_DIALOG_HEADER_WRAPPER"]')).toBeInTheDocument();
    expect(screen.getByText('Alert Dialog').getAttribute('data-paste-element')).toEqual('ALERT_DIALOG_HEADER');
    expect(
      screen
        .getByText('Are you sure you want to submit this application? No information can be changed after submitting.')
        .getAttribute('data-paste-element')
    ).toEqual('ALERT_DIALOG_BODY');
    // expect(container.querySelector('[data-paste-element="ALERT_DIALOG_FOOTER"]')).toBeInTheDocument();
  });
  it('should set the custom element prop on Alert Dialog', () => {
    const {container} = render(<CustomizedDestructiveAlertDialog />);
    expect(screen.getByTestId('destructive_alert_dialog').getAttribute('data-paste-element')).toEqual('FOO');
    // expect(container.querySelector('[data-paste-element="ALERT_DIALOG_HEADER_WRAPPER"]')).toBeInTheDocument();
    expect(screen.getByText('Alert Dialog').getAttribute('data-paste-element')).toEqual('FOO_HEADER');
    expect(
      screen
        .getByText('Are you sure you want to delete this data? This action cannot be undone.')
        .getAttribute('data-paste-element')
    ).toEqual('FOO_BODY');
    // expect(container.querySelector('[data-paste-element="ALERT_DIALOG_FOOTER"]')).toBeInTheDocument();
  });
});

describe('Alert Dialog customization', () => {
  it('should apply styles to Alert Dialog', () => {
    const {container} = render(<CustomizedAlertDialog />);
    expect(screen.getByTestId('alert_dialog')).toHaveStyleRule('background-color', 'rgb(255,241,179)');
    // expect(container.querySelector('[data-paste-element="ALERT_DIALOG_HEADER_WRAPPER"]')).toHaveStyleRule('border', 'inherit')
    expect(screen.getByText('Alert Dialog')).toHaveStyleRule('background-color', 'rgb(235,244,255)');
    expect(
      screen.getByText(
        'Are you sure you want to submit this application? No information can be changed after submitting.'
      )
    ).toHaveStyleRule('background-color', 'rgb(237,253,243)');
    // expect(container.querySelector('[data-paste-element="ALERT_DIALOG_FOOTER"]')).toHaveStyleRule('paddingTop', '5rem')
  });
  it('should apply styles to Alert Dialog with custom element prop', () => {
    const {container} = render(<CustomizedDestructiveAlertDialog />);
    expect(screen.getByTestId('destructive_alert_dialog')).toHaveStyleRule('background-color', 'rgb(214,31,31)');
    // expect(container.querySelector('[data-paste-element="ALERT_DIALOG_HEADER_WRAPPER"]')).toHaveStyleRule('border', 'inherit')
    expect(screen.getByText('Alert Dialog')).toHaveStyleRule('background-color', 'rgb(235,244,255)');
    expect(
      screen.getByText('Are you sure you want to delete this data? This action cannot be undone.')
    ).toHaveStyleRule('background-color', 'rgb(237,253,243)');
    // expect(container.querySelector('[data-paste-element="ALERT_DIALOG_FOOTER"]')).toHaveStyleRule('paddingTop', '5rem')
  });
});

describe('Accessibility', () => {
  it('Should have no accessibility violations for two button alert dialogs', async () => {
    const {container} = render(<AlertDialogWithTwoActions />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
