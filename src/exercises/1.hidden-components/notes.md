Hidden components pattern works BEST with hardcoded props.
There are only a few cases where it would work wih dynamic props

If you can identify distinct subsets of functionality, then you have found
hidden props. The way to tell if two subsets are distinct is by looking at the
rest of your application. If one set of props is used in one portion of your
application, and another used in a different one, then you can split the component
without really affecting any of the consumers. This is easier to tell with hardcoded props
but hardcoded props aren't necessary.

wrapper components help in refactoring because it gives a minimal facade you can
write a replacement for, and then indiana jones style swap out all at once.

This keeps the app working more or less all the time during the refactor - improving
the chances of refactoring success.

