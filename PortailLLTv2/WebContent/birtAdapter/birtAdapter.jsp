<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<fmt:requestEncoding value="ISO-8859-1"/>

<%@ page
	import="java.io.UnsupportedEncodingException,
			java.util.List,java.util.ArrayList,
			java.util.Set,java.util.HashSet,
			java.util.Collection,
			javax.servlet.http.HttpServletRequest,
			java.io.File,java.util.Iterator,
			java.util.Set,javax.servlet.ServletContext,
			javax.servlet.http.HttpServletRequest,
			com.actuate.iv.utility.IVParameterAccessor,
			java.io.IOException,java.io.OutputStream,
			java.io.UnsupportedEncodingException,
			java.net.URLEncoder,
			com.actuate.birt.BirtViewerUtil,
			com.actuate.reportcast.utils.StaticFuncs,
			com.actuate.iportal.common.IPortalConsts"%><%!
	
	static class BirtParameterAccessor
    {

        private static boolean isInitialized = false;

        /**
         * URL parameter name that gives the report design name.
         */
        public static final String PARAM_REPORT = "__report"; //$NON-NLS-1$

        /**
         * URL parameter name that gives the report document name.
         */
        public static final String PARAM_REPORT_DOCUMENT = "__document"; //$NON-NLS-1$

        /**
         * URL parameter name that gives the output report document file path.
         */
        public static final String PARAM_OUTPUT_DOCUMENT_NAME = "__outputDocName"; //$NON-NLS-1$
        
        /**
         * URL parameter name that gives the format to display the report, html or
         * pdf.
         */
        public static final String PARAM_FORMAT = "__format"; //$NON-NLS-1$

        /**
         * URL parameter name that gives the locale.
         */
        public static final String PARAM_LOCALE = "__locale"; //$NON-NLS-1$

        /**
         * Parameter that indicated data extraction format
         */
        public static final String PARAM_DATA_EXTRACT_FORMAT = "__extractformat"; //$NON-NLS-1$

        /**
         * Parameter that indicated data extraction extension id
         */
        public static final String PARAM_DATA_EXTRACT_EXTENSION = "__extractextension"; //$NON-NLS-1$

        /**
         * Parameter name that gives the result set names of the export data form.
         */
        public static final String PARAM_RESULTSETNAME = "__resultsetname"; //$NON-NLS-1$

        /**
         * Parameter name that gives the selected column numbers of the export data
         * form.
         */
        public static final String PARAM_SELECTEDCOLUMNNUMBER = "__selectedcolumnnumber"; //$NON-NLS-1$

        /**
         * Parameter name that gives the selected column names of the export data
         * form.
         */
        public static final String PARAM_SELECTEDCOLUMN = "__selectedcolumn"; //$NON-NLS-1$

        /**
         * URL parameter name to indicate the CSV separator.
         */
        public static final String PARAM_SEP = "__sep";//$NON-NLS-1$

        /**
         * URL Parameter name to indicate whether it is locale neutral.
         */
        public static final String PARAM_LOCALENEUTRAL = "__localeneutral"; //$NON-NLS-1$

        /**
         * URL parameter name to indicate the export encoding.
         */
        public static final String PARAM_EXPORT_ENCODING = "__exportencoding";//$NON-NLS-1$

        /**
         * Default separator
         */
        public static final char DEFAULT_SEP = ',';

        /**
         * URL parameter name to indicate whether exports column's data type.
         */
        public static final String PARAM_EXPORT_DATATYPE = "__exportdatatype";//$NON-NLS-1$

        /**
         * URL parameter name that determines whether to overwrite the document or
         * not.
         */
        public static final String PARAM_OVERWRITE = "__overwrite"; //$NON-NLS-1$

        /**
         * Format parameter constants to display the report in html.
         */
        public static final String PARAM_FORMAT_HTM = "htm"; //$NON-NLS-1$

        public static final String PARAM_FORMAT_HTML = "html"; //$NON-NLS-1$

        /**
         * URL parameter name that determins to support the SVG or not.
         */
        public static final String PARAM_SVG = "__svg"; //$NON-NLS-1$

        /**
         * URL parameter name that gives the dpi to show the report.
         */
        public static final String PARAM_DPI = "__dpi"; //$NON-NLS-1$

        public static final String PARAM_RESOURCE_FOLDER = "__resourceFolder"; //$NON-NLS-1$

        /**
         * URL parameter name that gives the page number to display the report.
         */
        public static final String PARAM_PAGE = "__page"; //$NON-NLS-1$

        /**
         * URL parameter name that gives the image ID to display.
         */
        public static final String PARAM_IMAGEID = "__imageid"; //$NON-NLS-1$

        /**
         * URL parameter name that gives the bookmark expression.
         */
        public static final String PARAM_BOOKMARK = "__bookmark"; //$NON-NLS-1$

        /**
         * URL parameter name that indicate the bookmark is TOC name.
         */
        public static final String PARAM_ISTOC = "__istoc"; //$NON-NLS-1$

        /**
         * URL parameter name that gives that image rtl option.
         */
        public static final String PARAM_RTL = "__rtl"; //$NON-NLS-1$

        /**
         * URL parameter name to indicate whether need to run a reportlet.
         */
        public static final String PARAM_ISREPORTLET = "__isreportlet";//$NON-NLS-1$

        /**
         * URL parameter name that gives the report design name.
         */
        public static final String PARAM_ISNULL = "__isnull"; //$NON-NLS-1$

        /**
         * URL parameter name to indicate the page overflow when render report as PDF.
         */
        public static final String PARAM_PAGE_OVERFLOW = "__pageoverflow";//$NON-NLS-1$

        /**
         * URL parameter name that determines to support masterpage or not.
         */
        public static final String PARAM_MASTERPAGE = "__masterpage"; //$NON-NLS-1$
        
        /**
         * URL parameter name that force to show parameter page.
         */
        public static final String PARAM_PARAMETERPAGE = "__parameterpage";

        /**
         * UTF-8 encode constants.
         */
        public static final String UTF_8_ENCODE = "UTF-8"; //$NON-NLS-1$

        /**
         * ISO-8859-1 encode constants.
         */
        public static final String ISO_8859_1_ENCODE = "ISO-8859-1"; //$NON-NLS-1$

        /**
         * Page overflow mode when render report as PDF/PS
         */
        public static final int PAGE_OVERFLOW_AUTO = 0;

        public static final int PAGE_OVERFLOW_ACTUAL = 1;

        public static final int PAGE_OVERFLOW_FITTOPAGE = 2;

        /**
         * Overwrite flag
         */
        public static boolean isOverWrite;

        /**
         * prepare for the birt defined url paramter list
         */

        public static Set birtParamters = null;

        /**
         * Get URL parameter
         * 
         * @param request
         * @param parameterName
         * @return
         */
        public static String getParameter( HttpServletRequest request,
                String parameterName )
        {
            String value = request.getParameter( parameterName );
            String encoding = request.getCharacterEncoding();
            return toUTFString( value, encoding );
        }

        /**
         * Convert to UTF-8 string
         * 
         * @param s
         * @param encoding
         * @return
         */
        public static String toUTFString( String s, String encoding )
        {
            String UTFString = s;
            String sourceEncoding = encoding;

            if ( s != null )
            {
                if ( sourceEncoding == null )
                {
                    sourceEncoding = ISO_8859_1_ENCODE;
                }
                try
                {
                    UTFString = new String( s.getBytes( sourceEncoding ),
                            UTF_8_ENCODE );
                }
                catch ( UnsupportedEncodingException e )
                {
                    UTFString = s;
                }
            }

            return UTFString;
        }

        /**
         * Get report design file
         * 
         * @param request
         * @return
         */
        public static String getReportDesign( HttpServletRequest request )
        {
            return getParameter( request, PARAM_REPORT );
        }

        /**
         * Get report document file
         * 
         * @param request
         * @return
         */
        public static String getReportDocument( HttpServletRequest request )
        {
            return getParameter( request, PARAM_REPORT_DOCUMENT );
        }

        /**
         * Returns the data extraction format
         * 
         * @param request
         * @return
         */
        public static String getExtractFormat( HttpServletRequest request )
        {
            return getParameter( request, PARAM_DATA_EXTRACT_FORMAT );
        }

        /**
         * Returns the data extraction extension
         * 
         * @param request
         * @return
         */
        public static String getExtractExtension( HttpServletRequest request )
        {
            return getParameter( request, PARAM_DATA_EXTRACT_EXTENSION );
        }

        /**
         * Returns the separator key
         * 
         * @param request
         * @return
         */
        public static int getSep( HttpServletRequest request )
        {
            int sepKey = getParameterAsInt( request, PARAM_SEP );
            if ( sepKey < 0 )
                return 0;

            return sepKey;

            // TODO: handle the externalization problem.

            // String key = "viewer.sep." + sepKey; //$NON-NLS-1$
            // String sep = getInitProp( key );
            // if ( sep == null || sep.length( ) <= 0 )
            // return DEFAULT_SEP;
            //
            // return sep.charAt( 0 );
        }
       
        /**
         * Returns whether exports column's data type
         * 
         * @param request
         * @return
         */
        public static boolean isExportDataType( HttpServletRequest request )
        {
            String flag = getParameter( request, PARAM_EXPORT_DATATYPE );
            if ( "true".equalsIgnoreCase( flag ) ) //$NON-NLS-1$
                return true;

            return false;
        }

        /**
         * Get result set name.
         * 
         * @param request
         * @return
         */

        public static String getResultSetName( HttpServletRequest request )
        {
            return getParameter( request, PARAM_RESULTSETNAME );

            // TODO: report parameter??
        }

        /**
         * Returns whether it is locale neutral
         * 
         * @param request
         * @return
         */
        public static boolean isLocaleNeutral( HttpServletRequest request )
        {
            String flag = getParameter( request, PARAM_LOCALENEUTRAL );
            if ( "true".equalsIgnoreCase( flag ) ) //$NON-NLS-1$
                return true;

            return false;
        }

        /**
         * Returns the encoding for export data.
         * 
         * @param request
         * @return
         */

        public static String getExportEncoding( HttpServletRequest request )
        {
            String encoding = getParameter( request, PARAM_EXPORT_ENCODING );

            // use UTF-8 as the default encoding
            if ( encoding == null )
                encoding = UTF_8_ENCODE;

            return encoding;
        }
        
        /**
         * Returns the show parameter page flag.
         *
         * @param request
         * @return
         */
        
        public static String getShowParameterPage( HttpServletRequest request )
        {
            return getParameter( request, PARAM_PARAMETERPAGE );
       }

        /**
         * Get report format.
         * 
         * @param request
         *            http request
         * @return report format
         */

        public static String getFormat( HttpServletRequest request )
        {
            String format = getParameter( request, PARAM_FORMAT );
            if ( format != null && format.length() > 0 )
            {
                if ( PARAM_FORMAT_HTM.equalsIgnoreCase( format ) )
                    return PARAM_FORMAT_HTML;

                return format;
            }

            return null; // The default format is html.
        }

        /**
         * Check whether enable svg support or not.
         * 
         * @param request
         *            http request
         * @return whether the SVG flag is set, or null if none
         * was specified in the request
         */

        public static Boolean getSVGFlag( HttpServletRequest request )
        {
            Boolean svg = null;
			String svgValue = getParameter( request, PARAM_SVG );
			if ( svgValue != null && !"".equals( svgValue ) ) {
				svg = Boolean.valueOf(svgValue);
			}
            
            return svg;
        }

        /**
         * Returns whether the bookmark is TOC
         * 
         * @param request
         * @return boolean
         */

        public static boolean isToc( HttpServletRequest request )
        {
            boolean flag = false;

            String isToc = getParameter( request, PARAM_ISTOC );
            if ( "true".equalsIgnoreCase( isToc ) ) //$NON-NLS-1$
            {
                flag = true;
            }

            return flag;
        }

        /**
         * Get selected column name list.
         * 
         * @param request
         * @return
         */

        public static Collection getSelectedColumns( HttpServletRequest request )
        {
            ArrayList columns = new ArrayList();

            int columnCount = getParameterAsInt( request,
                    PARAM_SELECTEDCOLUMNNUMBER );
            for ( int i = 0; i < columnCount; i++ )
            {
                String paramName = PARAM_SELECTEDCOLUMN + String.valueOf( i );
                String columnName = getParameter( request, paramName );
                columns.add( columnName );
            }

            return columns;
        }

        /**
         * Check whether report design will overwrite report doc or not.
         * 
         * @param request
         * @return
         */

        public static boolean isOverwrite( HttpServletRequest request )
        {
            boolean overwrite = isOverWrite;

            String urlParam = getParameter( request, PARAM_OVERWRITE );
            if ( "true".equalsIgnoreCase( urlParam ) ) //$NON-NLS-1$
            {
                overwrite = true;
            }

            return false;
        }

        /**
         * Get named parameter as integer from http request. parameter names and
         * values are all in iso-8859-1 format in request.
         * 
         * @param request
         * @param parameterName
         * @return
         */

        public static int getParameterAsInt( HttpServletRequest request,
                String parameterName )
        {
            int iValue = -1;
            String value = getParameter( request, parameterName );

            if ( value != null && value.length() > 0 )
            {
                try
                {
                    iValue = Integer.parseInt( value );
                }
                catch ( NumberFormatException ex )
                {
                    iValue = -1;
                }
            }
            return iValue;
        }

        /**
         * initialize the birt Viewer url parameter list. This is the
         * workaround used to check if the url contains any report design parameters, if yes,
         * need to add the report parameters to the converted url.
         */
        public synchronized static void init()
        {
            if ( isInitialized )
            {
                return;
            }
            birtParamters = new HashSet();
            birtParamters.add( PARAM_REPORT );
            birtParamters.add( PARAM_REPORT_DOCUMENT );
            birtParamters.add( PARAM_FORMAT );
            birtParamters.add( PARAM_LOCALE );
            birtParamters.add( PARAM_OUTPUT_DOCUMENT_NAME );
            birtParamters.add( PARAM_DATA_EXTRACT_FORMAT );
            birtParamters.add( PARAM_DATA_EXTRACT_EXTENSION );
            birtParamters.add( PARAM_RESULTSETNAME );
            birtParamters.add( PARAM_SELECTEDCOLUMNNUMBER );
            birtParamters.add( PARAM_SELECTEDCOLUMN );
            birtParamters.add( PARAM_SEP );
            birtParamters.add( PARAM_LOCALENEUTRAL );
            birtParamters.add( PARAM_EXPORT_ENCODING );
            birtParamters.add( PARAM_EXPORT_DATATYPE );
            birtParamters.add( PARAM_OVERWRITE );
            birtParamters.add( PARAM_SVG );
            birtParamters.add( PARAM_DPI );
            birtParamters.add( PARAM_PAGE );
            birtParamters.add( PARAM_IMAGEID );
            birtParamters.add( PARAM_BOOKMARK );
            birtParamters.add( PARAM_ISTOC );
            birtParamters.add( PARAM_RTL );
            birtParamters.add( PARAM_ISREPORTLET );
            birtParamters.add( PARAM_ISNULL );
            birtParamters.add( PARAM_PAGE_OVERFLOW );           
            birtParamters.add( PARAM_PARAMETERPAGE );

            // not supported by this conversion
            birtParamters.add( "__appcontextname" );
            birtParamters.add( "__id" );
            birtParamters.add( "__title" );
            birtParamters.add( "__showtitle" );
            birtParamters.add( "__toolbar" );
            birtParamters.add( "__navigationbar" );
            birtParamters.add( "__maxrows" );
            birtParamters.add( "__resourceFolder" );
            birtParamters.add( "__pattern" );
            birtParamters.add( "__target" );
            birtParamters.add( "__nocache" );
            birtParamters.add( "__asattachment" );
            birtParamters.add( "__action" );
            birtParamters.add( "__clean" );
            birtParamters.add( "__agentstyle" );
            birtParamters.add( "__closewin" );
            birtParamters.add( "__masterpage" );
            birtParamters.add( "__cubememsize" );
            birtParamters.add( "__maxrowlevels" );
            birtParamters.add( "__maxcolumnlevels" );

            isInitialized = true;
        }
    }

    static class AVParameterAccessor
    {

        /**
         * URL parameter name that gives the report design name.
         */
        public static final String PARAM_DESIGN = "__design"; //$NON-NLS-1$

        /**
         * the frameset servlet path for rendering report within the viewer.
         */
        public static final String BIRT_SERVLET_FRAMESET = "/frameset";//$NON-NLS-1$

        /**
         * the run servlet path for rendering report without any frame.
         */
        public static final String BIRT_SERVLET_RUN = "/run";//$NON-NLS-1$

        /**
         * the preview servlet path for rendering report without showing the viewer
         * frame.
         */
        public static final String BIRT_SERVLET_PREVIEW = "/preview";

        /**
         * the document servlet path for generating document.
         */
        public static final String BIRT_SERVLET_DOCUMENT = "/document";

        /**
         * the download serlet path for extracting data.
         */
        public static final String BIRT_SERVLET_DOWNLOAD = "/download";

        /**
         * the data extract servlet path for extracting data.
         */
        public static final String BIRT_SERVLET_EXTRACT = "/extract";//$NON-NLS-1$

        /**
         * the output servlet path for printing report.
         */
        public static final String BIRT_SERVLET_OUTPUT = "/output";//$NON-NLS-1$

        /**
         * the parameter page servlet
         */
        public static final String BIRT_SERVLET_PARAMETER = "/parameter";//$NON-NLS-1$

        /**
         * Run report file name
         */
        public static final String PARAM_RUN_REPORT = "__executablename";//$NON-NLS-1$

        /**
         * The run report request type
         */
        public static final String PARA_REQUEST_TYPE = "__requesttype";//$NON-NLS-1$

        /**
         * immediate type.
         */
        public static final String REQUEST_TYPE_IMMEDIATE = "immediate";//$NON-NLS-1$

        
        public static final String PARAM_PROGRESSIVE_VIEWING = "__progressive"; //$NON-NLS-1$

        /**
         * This tells iPortal that this request is coming from Open Source
         */
        public static final String PARA_OS_VIEWER = "__osViewer";//$NON-NLS-1$

        /**
         * The flag to indicate if the request should be processed in the same window
         */
        public static final String PARA_NEW_WINDOW = "__newWindow";//$NON-NLS-1$

        /**
         * As long as __osViewer is passed as part of the URL, iPortal will interpret it as
         * the request coming from Open Source.
         */
        public static final String OS_VIEWER_VALUE = "";//$NON-NLS-1$

        /**
         * URL parameter name that gives the report document name.
         */
        public static final String PARAM_DOC = "__report"; //$NON-NLS-1$

        public static final String PARAM_REPOSITORY_TYPE = "repositoryType";

        /**
         * IV Servlet path
         */
        public static final String IV_SERVLET = "iv";

        /**
         * Execute report action
         */
        public static final String EXECUTE_REPORT_SERVLET = "executereport.do";

        /**
         * the true value of the url parameter
         */
        public static final String TRUE_VALUE = "true";

        public static final String FALSE_VALUE = "false";

        /**
         * Anonymous user
         */
        public static final String USER_ANONYMOUS = "anonymous";

        public static final String PASSWORD_ANONYMOUS = "";

        /**
         * Path separator
         */
        public static final String PATH_SEPARATOR = "/"; //$NON-NLS-1$

        /**
         * Separator that connects the query parameter values.
         */
        public static final String PARAMETER_SEPARATOR = "&"; //$NON-NLS-1$

        /**
         * The character to start the query string in the url.
         */
        public static final String QUERY_CHAR = "?"; //$NON-NLS-1$

        /**
         * Equals operator.
         */
        public static final String EQUALS_OPERATOR = "="; //$NON-NLS-1$

        /**
         * Context parameters setting
         */
        public static final String CONTEXT_PARAM_REPOSITORY_TYPE = "REPOSITORY_TYPE";

        public static final String CONTEXT_PARAM_STANDALONE_REPOSITORY_PATH = "STANDALONE_REPOSITORY_PATH";

        public static final String BIRT_SAVE_REPORT_DOCUMENT_FOLDER = "BIRT_SAVE_REPORT_DOCUMENT_FOLDER";

        /**
         * Whether done initialization
         */
        private static boolean isInitialized = false;

        /**
         * Base Folder setting
         */
        private static String workingFolder = null;

        /**
         *the document generate folder.
         */
        private static String documentFolder = null;

        /**
         * Repository type
         */
        private static String repositoryType = null;

        /**
         * Indicate if this url contains report parameters
         */
        private static boolean hasReportParameter = false;
        
        /**
        * Indicate if currently running as AJC
        */
        private static boolean isAJC = false;

        /**
         * Initialize parameters from ServletContext
         * 
         * @param context
         */
        public synchronized static void initParameters( ServletContext context )
        {
            // assert context != null;
            if ( isInitialized )
                return;

            // get base folder
            workingFolder = context.getInitParameter( AVParameterAccessor.CONTEXT_PARAM_STANDALONE_REPOSITORY_PATH );
            // check relative path
            workingFolder = BirtViewerUtil.resolveRelativePath( workingFolder,
                    context );
            workingFolder = convertPathSeparators( workingFolder );
          
            if((context.getInitParameter((IPortalConsts.WEBXML_WORKGROUP_PRODUCT_MODE))!=null)
	                &&("ActuateJavaComponent".compareToIgnoreCase(context.getInitParameter(IPortalConsts.WEBXML_WORKGROUP_PRODUCT_MODE))==0))
            {  isAJC = true; }
          
            System.out.println( "workdingfolder is: " + workingFolder );
            documentFolder = context.getInitParameter( AVParameterAccessor.BIRT_SAVE_REPORT_DOCUMENT_FOLDER );
            documentFolder = convertPathSeparators( documentFolder );
            System.out.println( "document folder is: " + documentFolder );
            
         	// prevention of xss injection attack
    		String nonXSSValue = "";
    		if( StaticFuncs.isCrossSite( documentFolder ) )
    		{ 
    			nonXSSValue = StaticFuncs.jsEncode( documentFolder );
    			if ( documentFolder!=null && !documentFolder.equals(nonXSSValue ))
    			{				 
    				documentFolder = null;
    			}
    		}

            if ( isRelativePath( documentFolder ) )
                documentFolder = workingFolder + PATH_SEPARATOR
                        + documentFolder;
            // get repository type
            repositoryType = context.getInitParameter( AVParameterAccessor.CONTEXT_PARAM_REPOSITORY_TYPE );
            if ( repositoryType == null || repositoryType.trim().length() <= 0 )
                repositoryType = "Workgroup";

            isInitialized = true;
        }

        /**
         * build URL to do IV preview
         * 
         * @param request
         * @param design
         * @param doc
         * @return
         */
        public static String buildURL( HttpServletRequest request )
                throws Exception
        {
            // assert request != null;

            if ( workingFolder == null )
                throw new Exception( "Cannot find base folder setting." );

            String design = BirtParameterAccessor.getReportDesign( request );
            String doc = BirtParameterAccessor.getReportDocument( request );
            
         	// prevention of xss injection attack
    		String nonXSSValue = "";
    		if( StaticFuncs.isCrossSite( doc ) )
    		{ 
    			nonXSSValue = StaticFuncs.jsEncode( doc );
    			if ( doc!=null && !doc.equals(nonXSSValue ))
    			{				 
    				doc = null;
    			}
    		}
    		if( StaticFuncs.isCrossSite( design ) )
    		{ 
    			nonXSSValue = StaticFuncs.jsEncode( design );
    			if ( design!=null && !design.equals(nonXSSValue ))
    			{				 
    				design = null;
    			}
    		}

            if ( design == null && doc == null )
                throw new Exception(
                        "Please specify report design file or document file in URL." );

            // get base url
           // String url = request.getScheme() + "://" + request.getServerName()
            //        + ":" + request.getServerPort() + request.getContextPath();
           String url = "";

            String servlet = (String) request.getAttribute("servletPath");

            // convert the /run and /frameset path to the corresponding IV servlet.
            if ( ( servlet.equals( BIRT_SERVLET_FRAMESET ) )
                    || ( servlet.equals( BIRT_SERVLET_RUN ) )
                    || ( servlet.equals( BIRT_SERVLET_PREVIEW ) )
                    || ( servlet.equals( BIRT_SERVLET_PARAMETER ) )
                    || ( servlet.equals( BIRT_SERVLET_DOCUMENT ) ) 
                    || ( servlet.equals( BIRT_SERVLET_OUTPUT ) ) )
            {
                url = convertMainServlet( design, doc, url, request );
            }
            // convert the /extract servlet
            else if ( ( servlet.equals( BIRT_SERVLET_EXTRACT ) )
                    || ( servlet.equals( BIRT_SERVLET_DOWNLOAD ) ) )
            {
              //  if ( doc == null )
               //     throw new Exception( "Cannot find base folder setting." );

                url = convertExtractDataServlet( doc, url, request );

            }

            // handle rest of the url parameters
            url = convertURLParameters( url, request );

            // append repository type
            url += PARAMETER_SEPARATOR + PARAM_REPOSITORY_TYPE
                    + EQUALS_OPERATOR + CommonUtil.urlEncode( repositoryType );

            // append login information
            //url += PARAMETER_SEPARATOR + PARAM_USERID + EQUALS_OPERATOR
            //        + CommonUtil.urlEncode( USER_ANONYMOUS );

            // special handling for the commercial viewer cannot handle the
            // parameter case.
            // if (hasReportParameter)
            // url += PARAMETER_SEPARATOR + "postback" + EQUALS_OPERATOR + "false"
            // + PARAMETER_SEPARATOR + "invokeSubmit" + EQUALS_OPERATOR
            // + "true";

            return url;
        }

        /**
         * convert the url parameters from Birt Viewer format to iPortal format.
         * 
         * @param url
         *            the base url
         * @param request
         *            the http request
         * @return converted url
         */
        private static String convertURLParameters( String url,
                HttpServletRequest request )
        {

            // resource folder
            String resourceFolder = BirtParameterAccessor.getParameter(
                    request, BirtParameterAccessor.PARAM_RESOURCE_FOLDER );
            if ( resourceFolder != null && resourceFolder.trim().length() > 0 )
            {
                url += PARAMETER_SEPARATOR
                        + IPortalConsts.REQ_PARAM_RESOURCE_FOLDER
                        + EQUALS_OPERATOR
                        + CommonUtil.urlEncode( resourceFolder );
            }

            // svg
            Boolean svg = BirtParameterAccessor.getSVGFlag( request );
            if ( svg != null )
                url += PARAMETER_SEPARATOR + IVParameterAccessor.PARAM_SVG
                        + EQUALS_OPERATOR + (svg.booleanValue()?TRUE_VALUE:FALSE_VALUE);

            // dpi
            String dpi = BirtParameterAccessor.getParameter( request,
                    BirtParameterAccessor.PARAM_DPI );

			if ( dpi != null && !"".equals( dpi ) )
			{
                url += PARAMETER_SEPARATOR + IVParameterAccessor.PARAM_DPI
                        + EQUALS_OPERATOR + dpi;
            }

            // page
            int page = BirtParameterAccessor.getParameterAsInt( request,
                    BirtParameterAccessor.PARAM_PAGE );
            if ( page > 0 )
                url += PARAMETER_SEPARATOR + IVParameterAccessor.PARAM_PAGE
                        + EQUALS_OPERATOR + page;

            // imageid
            String imagename = BirtParameterAccessor.getParameter( request,
                    BirtParameterAccessor.PARAM_IMAGEID );
            if ( imagename != null )
                url += PARAMETER_SEPARATOR + IVParameterAccessor.PARAM_IMAGEID
                        + EQUALS_OPERATOR + imagename;

            // bookmark & toc
            String bookmark = BirtParameterAccessor.getParameter( request,
                    BirtParameterAccessor.PARAM_BOOKMARK );
            boolean isToc = BirtParameterAccessor.isToc( request );

            if ( bookmark != null )
            {

                if ( isToc )
                    url += PARAMETER_SEPARATOR + IVParameterAccessor.PARAM_TOC
                            + EQUALS_OPERATOR + bookmark;
                else
                    url += PARAMETER_SEPARATOR
                            + IVParameterAccessor.PARAM_BOOKMARK
                            + EQUALS_OPERATOR + bookmark;
            }

            // rtl
            String rtl = BirtParameterAccessor.getParameter( request, BirtParameterAccessor.PARAM_RTL );
            if ( rtl != null && rtl.trim( ).length( ) > 0 )
            {
                url += PARAMETER_SEPARATOR + BirtParameterAccessor.PARAM_RTL
                        + EQUALS_OPERATOR + rtl;
            }
            
            // masterPage
            String masterPage = BirtParameterAccessor.getParameter( request,
                    BirtParameterAccessor.PARAM_MASTERPAGE );
            if ( FALSE_VALUE.equalsIgnoreCase( masterPage ) )
                url += PARAMETER_SEPARATOR
                        + IVParameterAccessor.PARAM_MASTERPAGE
                        + EQUALS_OPERATOR + FALSE_VALUE;

            // reportlet
            if ( TRUE_VALUE //$NON-NLS-1$
            .equalsIgnoreCase( BirtParameterAccessor.getParameter( request,
                    BirtParameterAccessor.PARAM_ISREPORTLET ) ) )
            {
            	if( url.indexOf(IVParameterAccessor.PARAM_FORMAT) != -1)
            	{
            		url = url.replaceAll(PARAMETER_SEPARATOR + IVParameterAccessor.PARAM_FORMAT + EQUALS_OPERATOR , "");
            	}
            	
            	url += PARAMETER_SEPARATOR + IVParameterAccessor.PARAM_FORMAT
	                + EQUALS_OPERATOR
	                + IVParameterAccessor.PARAM_FORMAT_REPORTLET;
            }	

            // isnull
            String isnull = BirtParameterAccessor.getParameter( request,
                    BirtParameterAccessor.PARAM_ISNULL );
            if ( isnull != null )
                url += PARAMETER_SEPARATOR + IVParameterAccessor.PARAM_ISNULL
                        + EQUALS_OPERATOR + isnull;

            // locale
            String locale = BirtParameterAccessor.getParameter( request,
                    BirtParameterAccessor.PARAM_LOCALE );
            if ( locale != null )
                url += PARAMETER_SEPARATOR + IVParameterAccessor.PARAM_LOCALE
                        + EQUALS_OPERATOR + locale;
            

            // page overflow mode when render report as PDF/PS
            int pageFlow = BirtParameterAccessor.getParameterAsInt( request,
                    BirtParameterAccessor.PARAM_PAGE_OVERFLOW );
            if ( pageFlow >= 0 )
            {
                switch ( pageFlow )
                {
                case 0:
                    url += PARAMETER_SEPARATOR
                            + IVParameterAccessor.PARAM_PAGE_STYLE
                            + EQUALS_OPERATOR
                            + IVParameterAccessor.PARAM_PAGE_STYLE_AUTO;
                    break;
                case 1:

                    url += PARAMETER_SEPARATOR
                            + IVParameterAccessor.PARAM_PAGE_STYLE
                            + EQUALS_OPERATOR
                            + IVParameterAccessor.PARAM_PAGE_STYLE_ACTUALSIZE;
                    break;
                case 2:

                    url += PARAMETER_SEPARATOR
                            + IVParameterAccessor.PARAM_PAGE_STYLE
                            + EQUALS_OPERATOR
                            + IVParameterAccessor.PARAM_PAGE_STYLE_FIT_TOWHOLE;
                    break;
                }
            }
            
            String outputDocName = BirtParameterAccessor.getParameter( request,
                    BirtParameterAccessor.PARAM_OUTPUT_DOCUMENT_NAME );
         	// prevention of xss injection attack
    		String nonXSSValue = "";
    		if( StaticFuncs.isCrossSite( outputDocName ) )
    		{ 
    			nonXSSValue = StaticFuncs.jsEncode( outputDocName );
    			if ( outputDocName!=null && !outputDocName.equals(nonXSSValue ))
    			{				 
    				outputDocName = null;
    			}
    		}
            if ( outputDocName != null && outputDocName.trim().length() > 0 )
            {
                outputDocName = convertToIVFilePath(outputDocName);
                
				if (!outputDocName.startsWith(PATH_SEPARATOR))
				{
				    // 
					outputDocName = PATH_SEPARATOR +outputDocName;
				}
            	
                url += PARAMETER_SEPARATOR + IPortalConsts.REQ_PARAM_OUTPUT_DOCUMENT
                        + EQUALS_OPERATOR + CommonUtil.urlEncode( outputDocName );
            }
          
            // special handle for the report parameters.
            url = addReportParametersToURL( request, url );
          
            return url;
        }

        /**
         * Detects if the url contains any report design parameters, if yes add the
         * report design parameter and its value to the new converted url.
         * 
         * @param request
         *            the http request.
         * @param url
         *            the base url
         * @return the converted url
         */
        private static String addReportParametersToURL(
                HttpServletRequest request, String url )
        {

            // There is no way from the current context to know the report design
            // parameter names, so this is a workaround to get all the current url
            // parameter name list, and loop to check if the parameter is the birt
            // predefined parameters, if not, then it will be treated as a report
            // design parameter, add to the converted url.
            Set keys = request.getParameterMap().keySet();

            Iterator itr = keys.iterator();
            while ( itr.hasNext() )
            {

                String paramName = (String) itr.next();
                if ( ( !BirtParameterAccessor.birtParamters.contains( paramName ) )
                        && !paramName.startsWith( BirtParameterAccessor.PARAM_SELECTEDCOLUMN ) )
                {
                    String parameterValue = BirtParameterAccessor.getParameter(
                            request, paramName );

                    if ( parameterValue != null && !"".equals( parameterValue ) )
                    {
                        url += PARAMETER_SEPARATOR + paramName
                                + EQUALS_OPERATOR
                                + CommonUtil.urlEncode( parameterValue );

                        hasReportParameter = true;
                    }
                }
            }

            return url;
        }

        /**
         * Converts the servlet path from birt supported path to IV support path.
         * 
         * @param design
         *            the report design file.
         * @param doc
         *            the report document file.
         * @param base
         *            the base url.
         * @return returns the converted url.
         */
        private static String convertMainServlet( String design, String doc,
                String url, HttpServletRequest request )
        {

            boolean overWrite = BirtParameterAccessor.isOverwrite( request );
         
            String desginFile = convertToIVFilePath( design );
            String docFile = convertToIVFilePath( doc );
            boolean existed = isExisted( doc );
         
            if(!isAJC)
              existed = true;
            //ted #6712 #6720
			if ( doc != null && existed)
			{
				url += PATH_SEPARATOR + IV_SERVLET + QUERY_CHAR + PARAM_DOC
					+ EQUALS_OPERATOR + CommonUtil.urlEncode( docFile );
			}
			else
			{
				if ( design != null )
				{
				    //ted 12396
				    String pageControl = PARAMETER_SEPARATOR + PARA_OS_VIEWER
				    				  + EQUALS_OPERATOR + OS_VIEWER_VALUE + PARAMETER_SEPARATOR 
				    				  + PARA_NEW_WINDOW + EQUALS_OPERATOR + "false";
				    String showParameterPage = BirtParameterAccessor.getShowParameterPage(request);
				    if(showParameterPage!= null)
				    {
				        if(Boolean.valueOf(showParameterPage).booleanValue())
				            pageControl = "";
				        else
				            pageControl = PARAMETER_SEPARATOR +"invokeSubmit=true";
				    }
				        				    
					url += PATH_SEPARATOR + EXECUTE_REPORT_SERVLET
						+ QUERY_CHAR + PARA_REQUEST_TYPE
						+ EQUALS_OPERATOR + REQUEST_TYPE_IMMEDIATE
						+ pageControl
						+ PARAMETER_SEPARATOR + PARAM_RUN_REPORT
						+ EQUALS_OPERATOR
						+ CommonUtil.urlEncode( desginFile );
				
				}
				else
				{
				throw new RuntimeException(
					"Missing report design name" );
				}
			}

	    	String servlet = (String )request.getAttribute("servletPath");    
            String format = BirtParameterAccessor.getFormat( request );
            
            if (servlet.equals( BIRT_SERVLET_PREVIEW ) 
            		|| servlet.equals( BIRT_SERVLET_OUTPUT )
            		|| servlet.equals( BIRT_SERVLET_DOCUMENT )
            		|| servlet.equals( BIRT_SERVLET_RUN ))
            {
            	if (format == null || "".equals(format))
            	{
            		format = BirtParameterAccessor.PARAM_FORMAT_HTML;
            	}
            	
            }
            
            // append the format except if the servlet is frameset and at the same time the format is html 
            if ( format != null && !(servlet.equals( BIRT_SERVLET_FRAMESET ) && BirtParameterAccessor.PARAM_FORMAT_HTML.equals( format )) ) 
            {
                if ( "postscript".equalsIgnoreCase(format) )
                {
                	format = "ps";
                }
            	
                url += PARAMETER_SEPARATOR + IVParameterAccessor.PARAM_FORMAT
                        + EQUALS_OPERATOR + CommonUtil.urlEncode( format );
                
                // ted 18527
                url += PARAMETER_SEPARATOR + AVParameterAccessor.PARAM_PROGRESSIVE_VIEWING + EQUALS_OPERATOR + "false";
            }
            //ted 23339.Why here is an empty url parameter "&__format="?
            if ( format != null
                    && ( servlet.equals( BIRT_SERVLET_FRAMESET ) && BirtParameterAccessor.PARAM_FORMAT_HTML.equals( format ) ) )
            {
            	   url += PARAMETER_SEPARATOR + IVParameterAccessor.PARAM_FORMAT
                       + EQUALS_OPERATOR;

            }
            else if ( BirtParameterAccessor.PARAM_FORMAT_HTML.equals( format )) 
            { 
            	// check if page is specified
	        	int page = BirtParameterAccessor.getParameterAsInt( request,
	                    BirtParameterAccessor.PARAM_PAGE );
	        	
	        	//ted 9481. When the __page=all and __bookmark specify at the same time the bookmark will not take effect.
	        	if ( page <= 0 )
	        	{
	        		// append __page=all
	        		url += PARAMETER_SEPARATOR + IVParameterAccessor.PARAM_PAGE + EQUALS_OPERATOR + "all";
	        	}
	        	
        	}

            return url;

        }

        /**
         * generate the document name and path based on report design name. 
         */
        private static String generateDocumentPath( String design )
        {
            String doc = null;
            String temp = null;
            design = convertPathSeparators( design );
            int lastPathSeparator = design.lastIndexOf( PATH_SEPARATOR );

            if ( lastPathSeparator == -1 )
                temp = design;
            else
                temp = design.substring( lastPathSeparator );

            doc = temp.substring( 0, temp.lastIndexOf( "." ) ) + "."
                    + "rptdocument";

            return documentFolder + PATH_SEPARATOR + doc;

        }

        /**
         *check whether the file existed.
         */

        private static boolean isExisted( String file )
        {
		   // ted 39156, no need to check the path is relative or not
		   // in different os, '/public/abc.rptdocument' would return different value
		   // on windows, it is 'relative path', but on linux it is absolute path
		   // but why tomcat on linux works but jboss failed? weird.
		   
		   // add check to remove double slash 
		   if(file == null )
            	return false;
           if( file.charAt( 0 ) == '/' )
           {
	           file = workingFolder + file;
           }
           else
           {
           	   file = workingFolder + PATH_SEPARATOR + file;
           }
           	File newfile = new File( file );
           	if ( newfile.exists() )
           	{
                 return true;
           	}
            return false;
        }

        /**
         * Convert all the url parameters related to data extraction from birt
         * format to IV format.
         * 
         * @param design
         *            the report desgin file.
         * @param doc
         *            the report document file.
         * @param url
         *            the base url
         * @return returns the converted url.
         * @throws Exception
         */
        private static String convertExtractDataServlet( String doc,
                String url, HttpServletRequest request ) throws Exception
        {

            String docFile = convertToIVFilePath( doc );
            // convert the path to iv?__ivcmd=download
            url += PATH_SEPARATOR + IV_SERVLET + QUERY_CHAR + PARAM_DOC
                    + EQUALS_OPERATOR + CommonUtil.urlEncode( docFile );

            // convert the resultset name
            String resultSetName = BirtParameterAccessor.getResultSetName( request );
            if ( resultSetName == null )
            {
                throw new Exception(
                        "Please specify the result name to extract data." );
            }
            url += PARAMETER_SEPARATOR
                    + IVParameterAccessor.PARAM_RESULTSETNAME
                    + EQUALS_OPERATOR
                    + CommonUtil.urlEncode( resultSetName );
            
            // convert the extraction data format, for example csv...
            String extractFormat = BirtParameterAccessor.getExtractFormat( request );
            if ( extractFormat != null )
            {
                url += PARAMETER_SEPARATOR
                		+ IVParameterAccessor.PARAM_FORMAT
                		+ EQUALS_OPERATOR
                		+ CommonUtil.urlEncode( extractFormat );
            }

            // convert if need to export the data type
            boolean dataType = BirtParameterAccessor.isExportDataType( request );
            if ( dataType )
                url += PARAMETER_SEPARATOR
                        + IVParameterAccessor.PARAM_EXPORT_DATA_TYPE
                        + EQUALS_OPERATOR + TRUE_VALUE;
            
            // convert if local neutral
            boolean localeNeutral = BirtParameterAccessor.isLocaleNeutral( request );
            if ( localeNeutral )
                url += PARAMETER_SEPARATOR
                        + IVParameterAccessor.PARAM_EXPORT_LOCALE_NEUTRAL
                        + EQUALS_OPERATOR + TRUE_VALUE;

            int sep = BirtParameterAccessor.getSep(request);
            url += PARAMETER_SEPARATOR + IVParameterAccessor.PARAM_SEP + EQUALS_OPERATOR + sep;

            // convert the export data encoding
            String encoding = BirtParameterAccessor.getExportEncoding( request );
            url += PARAMETER_SEPARATOR
                    + IVParameterAccessor.PARAM_EXPORT_ENCODING_STYLE
                    + EQUALS_OPERATOR + CommonUtil.urlEncode( encoding );

            // convert the column number and, add each column name to the
            // corresponding column number.
            int columnNumber = BirtParameterAccessor.getParameterAsInt(
                    request, BirtParameterAccessor.PARAM_SELECTEDCOLUMNNUMBER );

            if ( columnNumber > 0 )
            {
                url += PARAMETER_SEPARATOR
                        + IVParameterAccessor.PARAM_SELECTEDCOLUMNNUMBER
                        + EQUALS_OPERATOR + columnNumber;
              
                for ( int i = 0; i < columnNumber; i++ )
                {

                    String birtParamName = BirtParameterAccessor.PARAM_SELECTEDCOLUMN
                            + String.valueOf( i );
                    String columnName = BirtParameterAccessor.getParameter(
                            request, birtParamName );
                   
                    if(columnName != null)
                    {
	                    String IVParamName = IVParameterAccessor.PARAM_SELECTEDCOLUMN
	                            + String.valueOf( i );
	                    url += PARAMETER_SEPARATOR + IVParamName + EQUALS_OPERATOR
	                            + CommonUtil.urlEncode( columnName );
                	}
                }
            }

            return url;
        }

        /**
         * Convert file path to IV path
         * 
         * @param fileName
         * @return
         */
        public static String convertToIVFilePath( String fileName )
        {
            if ( fileName == null )
                return null;

            String filePath = fileName;
            filePath = convertPathSeparators( filePath );
            if ( isRelativePath( fileName ) )
            {
                //filePath = workingFolder + PATH_SEPARATOR + filePath;
                if ( !( filePath.startsWith( PATH_SEPARATOR ) ) )
                    filePath = PATH_SEPARATOR + filePath;
            }

            return filePath;
        }

        /**
         * Converts the path separators to PATH_SEPARATOR.
         * @param path input path
         * @return converted path
         */
        private static String convertPathSeparators( String path )
        {
            if ( path != null )
            {
                return path.replaceAll( "\\\\", PATH_SEPARATOR ); //$NON-NLS-1$
            }
            else
            {
                return null;
            }
        }

        /**
         * Checks if a given file name is a relative path.
         * 
         * @param fileName
         *            The file name.
         * @return A <code>boolean</code> value indicating if the file name is a
         *         relative path or not.
         */
        public static boolean isRelativePath( String fileName )
        {
            if ( fileName == null )
            {
                return false;
            }	
           	return !new File( fileName ).isAbsolute();
        }
    }

    /**
     * Common Utility class
     * 
     */
    static class CommonUtil
    {

        public static final String TITLE_ERROR = "Error"; //$NON-NLS-1$

        /**
         * Write message into stream
         * 
         * @param out
         * @param title
         * @param content
         * @throws IOException
         */
        public static void writeMessage( JspWriter out, String title,
                String content ) throws IOException
        {
            String message = "<html><head><title>" //$NON-NLS-1$
                    + title //$NON-NLS-1$
                    + "</title>"; //$NON-NLS-1$
            message += "<META HTTP-EQUIV=\"Content-Type\" CONTENT=\"text/html; charset=utf-8\"></head>"; //$NON-NLS-1$
            message += "<body"; //$NON-NLS-1$
            message += " style=\"background-color: #ECE9D8;\"><div style=\"font-size:10pt;\"><font color=\"red\">" //$NON-NLS-1$ //$NON-NLS-2$
                    + content + "</font></div></body></html>"; //$NON-NLS-1$
            out.write( message );
            out.flush();
           // out.close();
        }

        /**
         * Do URL encode using utf-8 encoding
         * 
         * @param inputStr
         * @return
         */
        public static String urlEncode( String inputStr )
        {
            if ( inputStr == null )
                return null;

            String encStr = "";
            try
            {
                encStr = URLEncoder.encode( inputStr, "UTF-8" );
            }
            catch ( UnsupportedEncodingException e )
            {
                encStr = inputStr;
            }

            return encStr;
        }
    }%><%
    HttpSession currentSession = request.getSession( false );
    AVParameterAccessor.initParameters( config.getServletContext() );
    BirtParameterAccessor.init();

    try
    {        
        System.out.println( "original url:  "+request.getQueryString() );
        String ivURL = AVParameterAccessor.buildURL( request );
        System.out.println( "final converted url:  " + ivURL );
        RequestDispatcher rd = request.getRequestDispatcher( ivURL  );
		rd.forward( request, response );		
      //response.sendRedirect( ivURL );
		out.clear();
		out=pageContext.pushBody();
    }
    catch ( Exception e )
    {
        //e.printStackTrace();
       
        CommonUtil.writeMessage( out,
                CommonUtil.TITLE_ERROR, e.getMessage() );
    }
%>