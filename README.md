打包说明
=
由于umiJs打包会缓存index.html  
目前尚未能够修改配置来避免这个文件，故凡上线版本需要将打包后dist下asset-manifest.json中删除index.html配置
+dist  
&emsp;-asset-manifest.json

model 说明
=
1、每一个非公共model中必须包含clearData reducer（为避免数据过多而没有释放内存导致应用卡慢等问题）
