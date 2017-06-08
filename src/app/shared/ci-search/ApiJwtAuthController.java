package com.cht.ictinv.web.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cht.ictinv.entity.bpm.ActIdUser;
import com.cht.ictinv.service.AuthService;
import com.cht.ictinv.service.JwtService;
import com.cht.ictinv.web.vo.AuthRequestVO;
import com.cht.ictinv.web.vo.AuthResponseVO;
/**
 * 跟認證授權有關的API服務
 *
 */
@RestController
public class ApiJwtAuthController {

	@Autowired AuthService authService ;
	@Autowired JwtService jwtService ;
	
	@RequestMapping(value = "/api/auth", method = RequestMethod.POST)
	public AuthResponseVO login(@RequestBody final AuthRequestVO userLogin) throws Exception {
		AuthResponseVO response = null;
	    if(userLogin.getName() == null) {
	        response = new AuthResponseVO(false, "name is null", null);
	    } else {
			ActIdUser userdb = authService.auth(userLogin);
			response = new AuthResponseVO(jwtService.doGenNewToken(userdb));
	    }
	    System.out.println("response:"+response);
	    return response;
	}
	
	
}
