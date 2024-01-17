CREATE TABLE `users` (
  `userId` bigint(20) NOT NULL AUTO_INCREMENT,
  `fullName` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `mobileNumber` varchar(14) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '1',
  `roleType` enum('Customer','Owner','Admin') NOT NULL DEFAULT 'Customer',
  `createdDate` timestamp(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedDate` timestamp(3) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`userId`),
  KEY `unq_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE `passport` (
  `passportId` bigint(20) NOT NULL AUTO_INCREMENT,
  `userId` bigint(20) NOT NULL,
  `authType` enum('Local','Facebook','Google') NOT NULL DEFAULT 'Local',
  `type` enum('Email','UserName','PhoneNumber') NOT NULL,
  `identifier` varchar(45) DEFAULT NULL,
  `value` varchar(100) NOT NULL,
  PRIMARY KEY (`passportId`),
  UNIQUE KEY `unq_authtype_identifier` (`authType`,`identifier`),
  KEY `idx_userId` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE `device` (
  `deviceId` bigint(20) NOT NULL AUTO_INCREMENT,
  `appType` enum('App','Browser') NOT NULL DEFAULT 'App',
  `os` enum('Ios','Android','Windows') NOT NULL,
  `brand` varchar(45) NOT NULL,
  `modelNo` varchar(45) NOT NULL,
  PRIMARY KEY (`deviceId`),
  UNIQUE KEY `idx_apptype_os_brand_modelno` (`appType`,`os`,`brand`,`modelNo`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE `user_session` (
  `userId` bigint(20) NOT NULL,
  `deviceId` bigint(20) NOT NULL,
  `serialNumber` varchar(50) NOT NULL,
  `accessToken` varchar(500) NOT NULL,
  `refreshToken` varchar(500) NOT NULL,
  `fcmToken` varchar(50) DEFAULT NULL,
  `versionNumber` varchar(10) NOT NULL,
  `latitude` decimal(10,3) DEFAULT NULL,
  `longitude` decimal(10,3) DEFAULT NULL,
  `geoPoint` point DEFAULT NULL,
  UNIQUE KEY `unq_userId_deviceId_serialnumber` (`userId`,`deviceId`,`serialNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `otp` (
  `email` varchar(50) NOT NULL,
  `otp` varchar(4) NOT NULL,
  `expiryTime` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `retryCount` tinyint(5) NOT NULL DEFAULT '0',
  UNIQUE KEY `unq_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `otp_history` (
  `userId` bigint(20) NOT NULL,
  `otp` varchar(4) NOT NULL,
  `email` varchar(4) NOT NULL,
  `retryCount` tinyint(5) NOT NULL,
  `expiryTime` varchar(45) NOT NULL,
  KEY `unq_userId` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `temp_upload` (
  `idTempUpload` bigint(12) unsigned NOT NULL AUTO_INCREMENT,
  `originalName` varchar(140) DEFAULT NULL,
  `mimeType` varchar(140) DEFAULT NULL,
  `destination` varchar(140) DEFAULT NULL,
  `size` int(12) DEFAULT NULL,
  `fileName` varchar(140) DEFAULT NULL,
  `path` varchar(140) DEFAULT NULL,
  `createdDate` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  UNIQUE KEY `idx_TempUpload_FileName` (`fileName`) USING BTREE,
  KEY `idx_TempUpload_idTempUpload` (`idTempUpload`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1 COMMENT='Temporary Upload Files.';


CREATE TABLE `user_error` (
  `errorId` bigint(20) NOT NULL AUTO_INCREMENT,
  `createdDate` timestamp(3) NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  `requestPath` varchar(80) DEFAULT NULL,
  `requestObject` json DEFAULT NULL,
  `error` json DEFAULT NULL,
  `errorMessage` varchar(100) DEFAULT NULL,
  `method` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`errorId`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `user_activity` (
  `activityId` bigint(20) NOT NULL AUTO_INCREMENT,
  `userId` bigint(20) DEFAULT NULL,
  `createdTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `type` varchar(45) DEFAULT NULL,
  `req` json DEFAULT NULL,
  `response` json DEFAULT NULL,
  PRIMARY KEY (`activityId`),
  KEY `idx_activity` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;
