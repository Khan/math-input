# math-input

Khan Academy's new expression editor for the mobile web. Used in the [Perseus](https://github.com/khan/perseus) exercise framework to power math input and expression editing on small screens.

Built with [React](https://github.com/facebook/react), [Redux](https://github.com/reactjs/redux), [MathQuill](https://github.com/mathquill/mathquill), [Aphrodite](https://github.com/khan/aphrodite) and more.

**Disclaimer**: `math-input` is under active development and, in fact, is yet to be fully rolled out across [khanacademy.org](https://www.khanacademy.org/). Its API could (and most likely will) change substantially in the near future!

## Supported Features

- Multiple keypad configurations, so as to accommodate for a range of possible input types (i.e., integers, fractions/mixed numbers, and algebraic expressions).
- Multi-page keypads, with swipeable page navigation.
- Touch-and-drag interactions (as supported by the stock iOS and Android keypads).
- A draggable cursor with a detached handle, for fine-grained control on touch devices.
- Custom state transitions for the editing experience, to streamline expression entry.

## Demo

A live demo is available via [GitHub Pages](http://khan.github.io/math-input/). You can configure some of the keypad's behaviors, along with the set of active keys, via the [editor](http://khan.github.io/math-input/custom.html).

Note that, as the input and keypad only respond to touch events, you'll need to enable mobile emulation mode (e.g., as supported by Chrome) in order to use the keypad in a desktop browser.

To run the demo locally, clone the repo, `npm install`, `npm run watch`, and open the `index.html` page. The local behaviors can similarly be customized via the editor @ `custom.html`.

## License

[MIT License](http://opensource.org/licenses/MIT)
