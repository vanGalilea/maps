import React, { useRef } from 'react';
import { Button } from 'react-native';
import MapboxGL, {
  SkyLayer,
  CameraRef,
  Camera,
  Logger,
  Terrain,
  RasterDemSource,
} from '@rnmapbox/maps';

import Page from '../common/Page';
import { BaseExampleProps } from '../common/BaseExamplePropTypes';

Logger.setLogLevel('verbose');

const styles = {
  mapView: { flex: 1 },
};

function SkyAndTerran(props: BaseExampleProps) {
  const cameraRef = useRef<CameraRef>(null);

  return (
    <Page {...props}>
      <Button
        title="Change"
        onPress={() =>
          cameraRef.current?.setCamera({
            heading: 60,
            zoomLevel: 13.5,
            animationDuration: 20000,
          })
        }
      />
      <MapboxGL.MapView
        style={styles.mapView}
        styleURL={'mapbox://styles/mapbox-map-design/ckhqrf2tz0dt119ny6azh975y'}
      >
        <Camera
          ref={cameraRef}
          centerCoordinate={[
            // -74.00597, 40.71427
            //-122.4189591, 37.6614238,
            -114.34411, 32.6141,
          ]}
          zoomLevel={13.1}
          heading={80}
          pitch={85}
        />

        <RasterDemSource
          id="mapbox-dem"
          url="mapbox://mapbox.mapbox-terrain-dem-v1"
          tileSize={514}
          maxZoomLevel={14}
        >
          <SkyLayer
            id="sky-layer"
            style={{
              skyType: 'atmosphere',
              skyAtmosphereSun: [0.0, 0.0],
              skyAtmosphereSunIntensity: 15.0,
            }}
          />

          <Terrain exaggeration={1.5} />
        </RasterDemSource>
      </MapboxGL.MapView>
    </Page>
  );
}

export default SkyAndTerran;