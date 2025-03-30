import { type RouteConfig, index, layout, route } from '@react-router/dev/routes';

export default [
  layout('./layouts/private.tsx', [
    index('./pages/scans/pulses/index.tsx'),
    /**
     * Scans
     */
    route('/platforms', './pages/scans/platforms/index.tsx'),
    route('/projects', './pages/scans/projects/index.tsx'),
    route('/providers', './pages/scans/providers/index.tsx'),
    route('/pulses/:slug', './pages/scans/pulses/details.tsx'),
    route('/heartbeats/:slug', './pages/scans/heartbeats/details.tsx'),

    /**
     * Targets
     */
    route('/clusters', './pages/targets/clusters/index.tsx'),
    route('/urls', './pages/targets/urls/index.tsx'),
    route('/urls/:slug', './pages/targets/urls/detail.tsx'),
  ]),
  route('/logout', './pages/auth/logout.tsx'),
  route('/login', './pages/auth/login.tsx'),
] satisfies RouteConfig;
