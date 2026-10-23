REFINED CUSTOM SVG ICONS
These are closer manual vector recreations of the six luminous gold industrial illustrations in the reference UI.
Each SVG is standalone and includes its own gradients, glow filter, halo rings, and highlight strokes.

Place files in public/icons/:
crane-rental.svg
heavy-lifting.svg
plant-erection.svg
construction-equipment.svg
readymix-concrete.svg
skilled-operators.svg

React:
<img src="/icons/crane-rental.svg" alt="Crane rental services" className="h-28 w-28" />

For a card:
<div className="group ...">
  <img src="/icons/crane-rental.svg" alt="" className="h-28 w-28 transition-transform duration-300 group-hover:-translate-y-1" />
  <h3>Crane Rental Services</h3>
</div>

These are custom redraws, not extracted original paths from the generated raster image.
