import simulate from 'miniprogram-simulate';
import path from 'path';

describe('cell', () => {
  const cell = simulate.load(path.resolve(__dirname, `../cell`), {
    less: true,
  });
  it(`:base`, () => {
    const id = simulate.load({
      template: `<t-cell id="cell"></t-cell>`,
      usingComponents: {
        't-cell': cell,
      },
    });
    const comp = simulate.render(id);
    comp.attach(document.createElement('parent-wrapper'));

    expect(comp.toJSON()).toMatchSnapshot();
  });

  it(`:event`, async () => {
    const handleClick = jest.fn();
    const id = simulate.load({
      template: `<t-cell id="cell" bind:click="handleClick"></t-cell>`,
      usingComponents: {
        't-cell': cell,
      },
      methods: {
        handleClick,
      },
    });
    const comp = simulate.render(id);
    comp.attach(document.createElement('parent-wrapper'));

    comp.querySelector('#cell >>> .t-cell').dispatchEvent('tap');

    await simulate.sleep(10);

    expect(handleClick).toHaveBeenCalled();
  });

  it(`:jump`, async () => {
    const handleClick = jest.fn();
    const jumpType = 'navigateTo';
    const id = simulate.load({
      template: `<t-cell id="cell" jumpType="{{jumpType}}" url="mockUrl" bind:click="handleClick"></t-cell>`,
      usingComponents: {
        't-cell': cell,
      },
      data: {
        jumpType,
      },
      methods: {
        handleClick,
      },
    });
    const comp = simulate.render(id);
    comp.attach(document.createElement('parent-wrapper'));

    comp.querySelector('#cell >>> .t-cell').dispatchEvent('tap');

    await simulate.sleep(10);

    expect(handleClick).toHaveBeenCalled();
  });

  it(`:with group`, () => {
    const group = simulate.load(path.resolve(__dirname, `../../cell-group/cell-group`), {
      less: true,
    });
    const id = simulate.load({
      template: `<t-cell-group></t-cell-group>`,
      usingComponents: {
        't-cell-group': group,
      },
    });
    const comp = simulate.render(id);
    comp.attach(document.createElement('parent-wrapper'));

    expect(comp.toJSON()).toMatchSnapshot();
  });
});