
/**
 * A planet generator with spherical LOD
 * @class
 * @name WorldLOD
 */

/**
 * WorldLOD constructor
 *
 * @memberOf WorldLOD
 */

function WorldLOD() {}

/**
 * Static variables
 */

WorldLOD.search_res = 2; // search 4x4 points in a tile if a recusion is required
WorldLOD.tiles_res = 2;  // tile res : resolution of the tiles 
WorldLOD.radius;         // planet radius

/**
 * Draw a world quad
 *
 * @memberOf RenderSystem
 * @param {Array.<Number>} pos the position of the quad
 * @param {Number} size the quad size
 */

WorldLOD.drawQuad = function(pos, size) 
{
    // comment out the following line for solid rendering
    glPolygonMode(GL_FRONT_AND_BACK, GL_LINE);
    glBegin(GL_QUADS);
    loopi(0, 4)
    {
        vec3f p = pos + vec3f((i & 1) ^ (i >> 1), (i >> 1), 0)*size;
        p = p.norm() * WorldLOD.radius;
        glVertex3f(p.x, p.y, p.z);
    }
    glEnd();
    glPolygonMode(GL_FRONT_AND_BACK, GL_FILL);      
}

/**
 * Recursively draw world quads
 *
 * @memberOf WorldLOD
 * @param {Array.<Number>} p the position to draw at
 * @param {Number} size the quad size
 * @param {Array.<Number>} center the center of detail on sphere
 */

WorldLOD.drawRecursive = function(p, size, center)
{
    // Shorthand
    var tiles_res = WorldLOD.tiles_res;

    float tile_size = float(size) / float(tiles_res);
    float ratio     = gui.screen[0].slider["lod.ratio"].val; // default = 0.5
    float minsize   = gui.screen[0].slider["detail"].val; // default = 0.01

    loopi(0, tiles_res) loopj(0, tiles_res)
    {
        float a = float(i) *size / float(tiles_res) + p.x;
        float b = float(j) *size / float(tiles_res) + p.y;
        float dist = acos(vec3f(a + 0.5*tile_size, b + 0.5*tile_size, p.z).norm().dot(center)) / M_PI;

        if (dist > 0.5) continue;//culling

        // recurse ?
        if (dist < 1.01*sqrt(2)*ratio*size && size > minsize)
            this.drawRecursive(vec3f(a, b, p.z), tile_size, center);    // yes
        else
            this.drawQuad(vec3f(a, b, p.z), tile_size);                 // no
    }
}

/**
 * Draw the world sphere
 *
 * @memberOf WorldLOD
 * @param {Array.<Number>} center the center of detail on the sphere
 */

WorldLOD.draw = function(center)
{
    // ||center|| = 1
    var patch_start = [-1, -1, -1];
    var patch_size = 2; // plane xy size

    // Draw 6 Planes

    // Front
    WorldLOD.drawRecursive(patch_start, 2, center);

    // Back
    glRotatef(180, 0, 1, 0);
    WorldLOD.drawRecursive(patch_start, patch_size, [-center.x, center.y, -center.z]);
    glRotatef(-180, 0, 1, 0);

    // Right
    glRotatef(90, 0, 1, 0);
    WorldLOD.drawRecursive(patch_start, patch_size, [-center.z, center.y, center.x]);
    glRotatef(-90, 0, 1, 0);

    // Left
    glRotatef(-90, 0, 1, 0);
    WorldLOD.drawRecursive(patch_start, patch_size, [center.z, center.y, -center.x]);
    glRotatef(90, 0, 1, 0);

    // Up
    glRotatef(90, 1, 0, 0);
    WorldLOD.drawRecursive(patch_start, patch_size, [center.x, center.z, -center.y]);
    glRotatef(-90, 1, 0, 0);

    // Down
    glRotatef(-90, 1, 0, 0);
    WorldLOD.drawRecursive(patch_start, patch_size, [center.x, -center.z, center.y]);
    glRotatef(90, 1, 0, 0);
}
