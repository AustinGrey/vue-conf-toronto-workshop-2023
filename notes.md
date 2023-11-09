# Ex. 1

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

Discussion

1. Ideal size? Discussion

Smart vs Dumb. If your dumb components have had the components broken down reasonable enough, and the smart components have
had their script broken down using composables enough, then thats the ideal size.

Red flag - are you losing focus as you try to read the code? Probably needs to be extracted

Atom, molecule, organism came up again. It might feel crazy to push components down to atom size, but you SAVE TIME WHEN WRITING UNIT TESTS

When do you make a comment one size of a component? General consensus was "When you start to feel lost/dumb while reading, then you should extract or break apart"

There is a tradeoff - lots of small components means LOTS OF COMPONENTS. One sign things are too small is that
you find you keep needing to dig into the child components before you can
understand the parent, then you might have broken things up too small.

1. Ideal size? Instruction

Too long === hard to understand at a glance
Too long === you feel like there is no good name for the component

---- side bar

Simon mentioned this course/book as valuable
http://cleancoder.com/products

---- end side bar



# business logic organization

MVC became populare because of it's innovation -> describing a separation of concerns
that allowed people to know where to put things, and where to look for them

Model of layers for Vue would be
UI/View <-> Controller <-> Logic

Controller exists to enable the separation of UI and Logic. That's it.

UI/View === Dumb/Humble
Controller === Controller Components (Smart)
Logic === Composables (this pattern does not apply to options api)

So dumb components shouldn't need to call the commposables.
Pinia stores are an example of a composable - but this layering isn't framework specific.

To keep things working while you refactor, you can write inline (IIFE or just a function not yet pulled out to it's own file) composables as an intermediate step

NOTE: You should almost always just make everything reactive by default, a common issue is beliving that something is reactive when it's not.
The performance hit for having things marked reactive is negligible. It's more a memory thing, but rarely is that an issue.

OPINION from instruction: ref vs reactive ---> defferred until we talk about it in the last section

# Ex. 6 extracting the logic

Here we extracted literally ALL the business logic out to a composable.

In this example ALL the logic in this component was pulled out.

This means that someone maintaining the logic is free to look at just how the variables and logic work without needing to regard the UI.

# humble components pattern

"Dumb" components from the smart/dumb components system, but with the
extra context of being in the same application of an View/controller/logic split


So now the dumb component is expected to be  descendant of a controller somewhere,
which is responsible for turning the data into the format necessary for the component to do it's job, not the humble components