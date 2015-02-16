#Hex map generator

Generating pseudo random hexmap

###OPTIONS
example with default value. if one option is missing, it will use the default value.
```
{
	width : 100;
	height : 100;
	landSea : 0.1;
	seed : 0;
	patchSize : 10;
	noiseImpact : 0.05;
	degree : 4;
}
```
###FEATURES
=
- PRNG with alea.js
- noise with simplex-noise.js
- shape with NURBS(three.js),layering NURBS of differente size(2^) to produce better shape

###TODO
=
- [ ] post generation opération for none dynamic maps(like biomes correction)
- [ ] adding river
- [ ] find better way for biomes génération

####More on hexagon

excellent post
http://www.redblobgames.com/grids/hexagons/
