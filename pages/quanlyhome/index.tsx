import React, { ReactElement } from 'react'
import Layout from '../components/Layout';

function Index() {
  return (
    <div>Index</div>
  )
}

Index.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
          <>{page}</>
        </Layout>
    );
  };

export default Index