<%-- --------------------------------------------------------------------------
	Actuate Corporation
	Copyright (C) 2009 Actuate Corporation. All rights reserved.
		
	Description:	
		included by login banner and general banner
		
	Accessed URL parameters:
		none
-------------------------------------------------------------------------- --%>
<%@ page import="com.actuate.iportal.license.LicenseManager,
				com.actuate.common.license.LicensedOption,
				com.actuate.reportcast.utils.StaticFuncs,
				com.actuate.reportcast.utils.AcTimeZone,
				com.actuate.reportcast.common.AcConstants" 
%>

<%@ taglib uri="/system" prefix="system" %>

<%
	com.actuate.reportcast.dstruct.ErrorObject connectError = null;
	
	int AC_UNLIMITED_CPU_VALUE		= 2147483647;
    boolean bIsValid 				= false;
    boolean bIsDevelopment			= false;
    String sUsageType				= null;
    
    String serverurl 							= userinfobean.getServerurl();
    com.actuate.reportcast.utils.AcTimeZone tz	= userinfobean.getTimezone();
    String repositorytype = userinfobean.getRepositoryType();
    String licenseId = null;

    String installMode = com.actuate.web.StartupUtil.getInstallMode();
     if ("express".equalsIgnoreCase(installMode) || "enterprise".equalsIgnoreCase(installMode) 
            || ("standalone".equalsIgnoreCase(installMode) && "enterprise".equalsIgnoreCase(repositorytype)))
    {
    	java.util.Properties usageTermsProp = StaticFuncs.getLicenseUsageTerms(serverurl);
    	if ( usageTermsProp == null )
    	{
    		com.actuate.schemas.internal.GetLicenseTermsResponse responseObj = com.actuate.common.util.LicenseTermsManager.instance().getLicenseTerms(request, serverurl, acLocale, tz, false);
    		if ( responseObj != null )
    		{
    			bIsDevelopment	= Boolean.TRUE.equals(responseObj.getIsDevelopment());
				if ( responseObj.getMode() != null )
				{
					bIsValid = true;
				}	
    		}	
	    }
    	
		usageTermsProp = StaticFuncs.getLicenseUsageTerms(serverurl);				
    	if ( usageTermsProp != null )
    	{
    		sUsageType = usageTermsProp.getProperty(StaticFuncs.LICENSE_TERMS_PROP_USAGETYPE);
    		bIsDevelopment = "true".equalsIgnoreCase(usageTermsProp.getProperty(StaticFuncs.LICENSE_TERMS_PROP_ISDEVELOPMENT))?true:false;
    		licenseId = usageTermsProp.getProperty(AcConstants.LICENSE_ID );
    	}
    }
    else // it is iPortal standalone workgroup installation.
    {
    	bIsValid 	= LicenseManager.checkIsValid();
    	sUsageType	= LicenseManager.usageType;
 
        if ( bIsValid )
        {
            Boolean boolDevLicense = LicenseManager.IsDevelopment;
            if (boolDevLicense != null)
            	bIsDevelopment 	= boolDevLicense.booleanValue();
        }
		Integer iLicenseId = LicenseManager.getLicenseId();
		licenseId = iLicenseId == null ? null : String.valueOf(iLicenseId);		
    }
 	if( sUsageType != null && sUsageType.length( ) > 1 )
 	{
 		int index = sUsageType.toLowerCase( ).indexOf( "(watermarked)" ); //$NON-NLS-1$
 		if ( index >= 0 )
 		{
 			sUsageType = sUsageType.substring( 0, index);
 		}
 	}

    if ( sUsageType != null && sUsageType.trim().length() <= 0 )
    {
    	sUsageType = null;
    }
%>
