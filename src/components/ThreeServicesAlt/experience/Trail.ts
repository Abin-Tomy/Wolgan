import * as THREE from 'three';

export class Trail {
  public group: THREE.Group;
  private points: THREE.Vector3[];
  private mesh: THREE.Mesh | null;

  public minDistance = 0.006;
  public maxPoints = 220;
  public curveTension = 0.5;
  public curveSegments = 220;
  public radialSegments = 8;
  public radiusHead = 0.012;
  public radiusTail = 0.003;
  public pointSmoothing = 0.3;
  public maxTrimPerFrame = 4;
  public jumpResetDistance = 999;

  public material: THREE.MeshStandardMaterial;

  constructor() {
    this.group = new THREE.Group();
    this.points = [];
    this.mesh = null;

    this.material = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#0A1F3C'), // Navy Blue as requested
      emissive: new THREE.Color('#0A1F3C'),
      emissiveIntensity: 0.5,
      roughness: 0.2,
      metalness: 0.05,
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
      depthTest: false,
      blending: THREE.NormalBlending,
    });
  }

  get object() {
    return this.group;
  }

  addPoint(position: THREE.Vector3) {
    if (!(position instanceof THREE.Vector3)) return;

    const lastPoint = this.points[this.points.length - 1] || null;

    if (lastPoint && position.distanceToSquared(lastPoint) < this.minDistance * this.minDistance) {
      return;
    }

    const nextPoint = position.clone();

    if (lastPoint && nextPoint.distanceTo(lastPoint) > this.jumpResetDistance) {
      this.points = [nextPoint];

      if (this.mesh) {
        this.mesh.geometry.dispose();
        this.group.remove(this.mesh);
        this.mesh = null;
      }

      return;
    }

    const easedPoint = lastPoint
      ? lastPoint.clone().lerp(nextPoint, this.pointSmoothing)
      : nextPoint;
    this.points.push(easedPoint);

    let trimBudget = this.maxTrimPerFrame;
    while (this.points.length > this.maxPoints && trimBudget > 0) {
      this.points.shift();
      trimBudget -= 1;
    }

    if (this.points.length < 2) {
      return;
    }

    const curve = new THREE.CatmullRomCurve3(this.points, false, 'centripetal', this.curveTension);
    const segments = Math.max(24, Math.min(this.curveSegments, this.points.length * 4));
    const nextGeometry = this.createTaperedTube(curve, segments, this.radiusHead, this.radiusTail);

    if (!this.mesh) {
      this.mesh = new THREE.Mesh(nextGeometry, this.material);
      this.mesh.renderOrder = 1200;
      this.group.add(this.mesh);
      return;
    }

    this.mesh.geometry.dispose();
    this.mesh.geometry = nextGeometry;
  }

  createTaperedTube(curve: THREE.CatmullRomCurve3, segments: number, radiusHead: number, radiusTail: number) {
    const pathPoints = curve.getSpacedPoints(segments);
    const radialSegments = this.radialSegments;
    const ringPoints = radialSegments + 1;

    const vertices = [];
    const indices = [];

    const up = new THREE.Vector3(0, 0, 1);
    const tangent = new THREE.Vector3();
    const normal = new THREE.Vector3();
    const binormal = new THREE.Vector3();
    const radialOffset = new THREE.Vector3();
    const vertexPosition = new THREE.Vector3();

    for (let i = 0; i < pathPoints.length; i += 1) {
      const t = i / Math.max(pathPoints.length - 1, 1);
      const radius = radiusHead + (radiusTail - radiusHead) * Math.pow(t, 1.5);

      curve.getTangent(t, tangent).normalize();
      normal.crossVectors(up, tangent).normalize();

      if (normal.lengthSq() === 0) {
        normal.set(1, 0, 0);
      }

      binormal.crossVectors(tangent, normal).normalize();

      for (let j = 0; j <= radialSegments; j += 1) {
        const angle = (j / radialSegments) * Math.PI * 2;
        const cx = -Math.cos(angle) * radius;
        const cy = Math.sin(angle) * radius;

        radialOffset.copy(normal).multiplyScalar(cx).addScaledVector(binormal, cy);

        vertexPosition.copy(pathPoints[i]).add(radialOffset);
        vertices.push(vertexPosition.x, vertexPosition.y, vertexPosition.z);
      }
    }

    for (let i = 0; i < pathPoints.length - 1; i += 1) {
      for (let j = 0; j < radialSegments; j += 1) {
        const baseIndex = i * ringPoints + j;
        indices.push(baseIndex, baseIndex + ringPoints, baseIndex + 1);
        indices.push(baseIndex + ringPoints, baseIndex + ringPoints + 1, baseIndex + 1);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();

    return geometry;
  }

  dispose() {
    this.reset();
    this.material.dispose();
  }

  reset() {
    if (this.mesh) {
      this.mesh.geometry.dispose();
      this.group.remove(this.mesh);
      this.mesh = null;
    }

    this.points = [];
  }
}
