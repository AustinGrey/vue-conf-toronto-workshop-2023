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



------------- side bar

During this class some people were talking about the "atom, molecule, organism" design pattern
and seemed to really like it

------------- end side bar


In this exercise, the outer div of the Online Indicator only makes use of the selected/useButton props
but the inner portion of the component makes use of the user props only. So these are completely
distinct sets of behavior that can be pulled apart.


So here the OnlineIndicator changes responsibilties from showing a user and their online status, to literally just
indicating if something is online or not, and it's up to the parent to indicate what that something is.