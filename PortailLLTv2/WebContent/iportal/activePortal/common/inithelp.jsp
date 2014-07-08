<%
    //Get the locale. This page does not search for the locale in cookies and web.xml 
    //file because when this page is invoked the locale must already be set in the 
    //session. If not it picks the default locale from LocaleManager.
	//PICKUP FROM SESSION
	AcLocale tmpAcLocale = (AcLocale) StaticFuncs.getAttribute(session, "locale");
	if (tmpAcLocale == null)
	{
		//PICKUP DEFAULT FROM LOCALE MANAGER
		tmpAcLocale = LocaleManager.instance().getDefaultLocale();
	}
	Locale tmpLocale = tmpAcLocale.getJavaLocale();

	String sHelpBaseVarName = (String)request.getAttribute("HelpBaseVariable");

	if(sHelpBaseVarName == null)
	{
		sHelpBaseVarName = "helpBase";
	}
	String sHelpBase = (String)StaticFuncs.getAttribute(session, sHelpBaseVarName);
	String sHelpBasePath = (String)request.getAttribute("HelpBasePath");
	if(sHelpBasePath == null)
	{
		sHelpBasePath = "help/";
	}

	if (sHelpBase == null)
	{
	// SETUP THE HELP BASE LINK
	String sSlash = System.getProperty("file.separator");
	ServletContext sc = pageContext.getServletContext();
	sHelpBase = sc.getRealPath("/help");
	String sLanguage = tmpLocale.getLanguage();
	String sCountry = tmpLocale.getCountry();
	String sVariant = tmpLocale.getVariant();

	int nLoc = (sLanguage.length() > 0) ? 2 : 1;
	nLoc += (sCountry.length() > 0) ? 1 : 0;
	nLoc += (sVariant.length() > 0) ? 1 : 0;
		
		if (sHelpBase == null)
		{
			java.net.URL urlHelpBase = null;
			try
			{
				urlHelpBase = sc.getResource("/help");
			}
			catch (java.net.MalformedURLException ex)
			{
				
			}

			// The help directory does not exist do not process anything.
			if ( urlHelpBase != null )
			{
				String [] saAbsNames = new String[nLoc];
				String [] saRelNames = new String[nLoc];
				String [] saAbs = {urlHelpBase.toExternalForm(), "/" + sLanguage, "_" + sCountry, "_" + sVariant};
				String [] saRel = { sHelpBasePath, sLanguage, "_" + sCountry, "_" + sVariant};
				saAbsNames[0] = saAbs[0];
				saRelNames[0] = saRel[0];
				for (int i = 1; i < nLoc; i++)
				{
					saAbsNames[i] = saAbsNames[i - 1] + saAbs[i];
					saRelNames[i] = saRelNames[i - 1] + saRel[i];
				}
				sHelpBase = null;
				for (int i = 0; i < nLoc; i++)
				{
					try
					{
						new java.net.URL(saAbsNames[i]);
						sHelpBase = saRelNames[i];
						break;  
					}
					catch (java.net.MalformedURLException ex)
					{
						continue;
					}
				}
			}
		}
		else
		{
			String[] saAbsNames = new String[nLoc];
			String[] saRelNames = new String[nLoc];
			String[] saAbs = { sHelpBase, sSlash + sLanguage, "_" + sCountry, "_" + sVariant};
			String[] saRel = { sHelpBasePath, sLanguage, "_" + sCountry, "_" + sVariant};
			saAbsNames[0] = saAbs[0];
			saRelNames[0] = saRel[0];
			for (int i = 1; i < nLoc; i++)
			{
				saAbsNames[i] = saAbsNames[i - 1] + saAbs[i];
				saRelNames[i] = saRelNames[i - 1] + saRel[i];
			}

			sHelpBase = null;
			for (int i = nLoc - 1; i >= 0; i--)
			{
				File fD = new File(saAbsNames[i]);
				if (fD.exists())
				{
					sHelpBase = saRelNames[i];
					break;
				}
			}
		}
		StaticFuncs.setAttribute(session, sHelpBaseVarName, sHelpBase);
	}

%>