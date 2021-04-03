<h1 align="center" style="border-bottom: none;">📽 Presentador</h1>
<h3 align="center">An opinionated presentation app. It will make the presentation for you.</h3>

<div align="center">

![Workflow state](https://github.com/kbariotis/presentador.app/workflows/Publish/badge.svg)

</div>

## Description

With `Presentador`, you simply put the elements you want on each slide and it will place them in the right place. No more messing with font-sizes and positions, just focus on your presentation.

There is only a single layout depending on the elements of your slide. `Presentador` parses the elements in each slide and assigns a certain pre-defined layout to it.

## Contributing

We could use all the help we can get. So please feel free to go through our open [issues]('https://github.com/kbariotis/presentador/issues') or create one if thought of a new cool feature or found a bug.

## Slide Compilation

The process of compiling a presentation is actually quite simple. Every slide starts with the `normal` state which is defined [here](./src/renderers/normal.tsx) (as all the other states). When we add a new element, for each state, we define rules as to which state should go on next.

Each file in the `./src/renderers` folder export two functions, one `renderer` that defines how this state should be rendered, and one `builder` that defines the rules of transition to a different state based on what element was added or removed.
