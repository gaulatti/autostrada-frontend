import { type RouteConfig, index, layout, route } from '@react-router/dev/routes';

export default [
  layout('./layouts/private.tsx', [
    index('./pages/scans/pulses/index.tsx'),
    /**
     * Metrics
     */
    route('/metrics/core-web-vitals', './pages/metrics/cwv/index.tsx'),
    route('/metrics/grades', './pages/metrics/grades/index.tsx'),

    /**
     * Scans
     */
    route('/scans/platforms', './pages/scans/platforms/index.tsx'),
    route('/scans/projects', './pages/scans/projects/index.tsx'),
    route('/scans/providers', './pages/scans/providers/index.tsx'),
    route('/scans/pulses/:slug', './pages/scans/pulses/details.tsx'),
    route('/scans/heartbeats/:slug', './pages/scans/heartbeats/details.tsx'),

    /**
     * Targets
     */
    route('/targets/clusters', './pages/targets/clusters/index.tsx'),
    route('/targets/urls', './pages/targets/urls/index.tsx'),
  ]),
  route('/logout', './pages/auth/logout.tsx'),
  route('/login', './pages/auth/login.tsx'),
] satisfies RouteConfig;
